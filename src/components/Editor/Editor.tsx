/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef } from 'react';
import { useMonaco, Editor, OnChange } from '@monaco-editor/react';
import { FileFormat } from '../Converter/FileFormat';
import * as monacoEditor from 'monaco-editor';
import { useDispatch, useSelector } from 'react-redux';
import { setInputError } from '@/store/slices/TextFieldInputs';
import { RootState } from '@/store/store';
import ValidateEditor from './ValidateEditor';
import { Alert } from '@mui/material';

const TextEditor = ({ value, edit, format, theme}: {
    value: string;
    edit: OnChange;
    format: FileFormat;
    theme: string;
}) => {
  const monaco = useMonaco();
  const editorRef = useRef(null) as React.MutableRefObject<null | any>;
  const dispatch = useDispatch();
  const inputType = useSelector((state: RootState) => state.inputType);
  const glpkError = useSelector((state: RootState) => {const solutionError = state.textFieldInputs[inputType].currentError; return solutionError});

  useEffect(() => {
    if (monaco) {
      const config = {
        surroundingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: '<', close: '>' },
          { open: "'", close: "'" },
          { open: '"', close: '"' },
        ],
        autoClosingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
          { open: '(', close: ')' },
          { open: "'", close: "'", notIn: ['string', 'comment'] },
          { open: '"', close: '"', notIn: ['string', 'comment'] },
        ],
      };
      
      monaco.languages.register({ id: FileFormat.GMPL.toString() });

      const gmpl_keywords = ['var', 'maximize', 'minimize', 's.t.', 'solve', 'display', 'end', 'param', 'set', 'dimen', 'binary', 'in', 'printf', 'data', 'and', 'else', 'mod', 'union', 'by', 'if', 'not', 'within', 'cross', 'in', 'or', 'diff', 'inter', 'symdiff', 'div', 'less', 'then']

      monaco.languages.setMonarchTokensProvider(FileFormat.GMPL.toString(), {
        gmpl_keywords,
        ignoreCase:false,
        tokenizer: {
          root: [
            [/\b(var|maximize|minimize|solve|display|end|param|set|dimen|setof|binary|sum|in|printf|data|and|else|mod|union|by|if|not|within|cross|in|or|diff|inter|symdiff|div|less|then)\b|s\.t\./, 'keyword'],
            [/\+|\-|\=|\<=|\>=|\<|\>|\:|\,|\:\=|\=\=|(?<!\/)\*(?!\*)|(?<!\*)\/(?!\*)/, 'operator'],
            [/(?<!in.*)(\w+)\s*:(?!\=)/, 'name'],
            [/[a-zA-Z_]\w*/, 'identifier'],
            [/\d+(\.\d+)?/, 'number'],
            [/[\(\)\[\]\{\}\;]/, 'brackets'],
            [/"([^"]*)"|'([^']*)'/, 'string'],
            [/#.*|\/\*[\s\S\n]*?\*\//, 'comment'],
            { include: '@whitespace' }
          ],
          whitespace: [[/[ \t\r\n]+/, '']],
        }
      });

      monaco.languages.registerCompletionItemProvider(FileFormat.GMPL.toString(), {
        provideCompletionItems: (model, position): monacoEditor.languages.ProviderResult<monacoEditor.languages.CompletionList> => {
          const wordUntilPosition = model.getWordUntilPosition(position);
          const word = model.getWordUntilPosition(position);
          const suggestions: monacoEditor.languages.CompletionItem[] = gmpl_keywords
            .filter(k => k.startsWith(word.word))
            .map(k => {
                return {
                  label: k,
                  kind: monaco.languages.CompletionItemKind.Keyword,
                  insertText: k,
                  range: {
                    insert: {
                      startLineNumber: position.lineNumber,
                      startColumn: wordUntilPosition.startColumn,
                      endLineNumber: position.lineNumber,
                      endColumn: position.column
                    },
                    replace: {
                      startLineNumber: position.lineNumber,
                      startColumn: wordUntilPosition.startColumn,
                      endLineNumber: position.lineNumber,
                      endColumn: position.column
                    }
                  }
                };
              });
            if ("sum".startsWith(word.word)) {
              suggestions.push({
                label: 'sum',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'sum{${1:}}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: {
                  insert: {
                    startLineNumber: position.lineNumber,
                    startColumn: wordUntilPosition.startColumn,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column
                  },
                  replace: {
                    startLineNumber: position.lineNumber,
                    startColumn: wordUntilPosition.startColumn,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column
                  }
                }
              });
            }
            if ("setof".startsWith(word.word)) {
              suggestions.push({
                label: 'setof',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'setof(${1:})',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: {
                  insert: {
                    startLineNumber: position.lineNumber,
                    startColumn: wordUntilPosition.startColumn,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column
                  },
                  replace: {
                    startLineNumber: position.lineNumber,
                    startColumn: wordUntilPosition.startColumn,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column
                  }
                }
              });
            }
          return { suggestions: suggestions };
        },
      });

      monaco.languages.setLanguageConfiguration(FileFormat.GMPL.toString(), config);

      monaco.languages.register({ id: FileFormat.CPLEX_LP.toString() });

      const lp_keywords = ['Maximize', 'Minimize', 'Subject To', 'Bounds', 'General', 'Binaries', 'Semi-Continuous', 'SOS', 'END']

      monaco.languages.setMonarchTokensProvider(FileFormat.CPLEX_LP.toString(), {
        ignoreCase:true,
        tokenizer: {
          root: [
            [/\b(Maximize|Minimize|Subject To|Bounds|General|Binaries|Semi-Continuous|SOS|END)\b/, 'keyword'],
            [/\+|\-|\*|\/|\=|\<=|\>=|\<|\>|\:/, 'operator'],
            [/(\w+)\s*:/, 'name'],
            [/[a-zA-Z_]\w*/, 'identifier'],
            [/\d+(\.\d+)?/, 'number'],
            [/[\(\)]/, 'brackets'],
            [/\\.*$/, 'comment'],
            { include: '@whitespace' }
          ],
          whitespace: [[/[ \t\r\n]+/, '']],
        }
      });

      monaco.languages.registerCompletionItemProvider(FileFormat.CPLEX_LP.toString(), {
        provideCompletionItems: (model, position): monacoEditor.languages.ProviderResult<monacoEditor.languages.CompletionList> => {
          const wordUntilPosition = model.getWordUntilPosition(position);
          const word = model.getWordUntilPosition(position);
          const suggestions: monacoEditor.languages.CompletionItem[] = lp_keywords
            .filter(k => k.startsWith(word.word))
            .map(k => {
                return {
                  label: k,
                  kind: monaco.languages.CompletionItemKind.Keyword,
                  insertText: k,
                  range: {
                    insert: {
                      startLineNumber: position.lineNumber,
                      startColumn: wordUntilPosition.startColumn,
                      endLineNumber: position.lineNumber,
                      endColumn: position.column
                    },
                    replace: {
                      startLineNumber: position.lineNumber,
                      startColumn: wordUntilPosition.startColumn,
                      endLineNumber: position.lineNumber,
                      endColumn: position.column
                    }
                  }
                };
              });
          return { suggestions: suggestions };
        },
      });

      monaco.languages.setLanguageConfiguration(FileFormat.GMPL.toString(), config);

      monaco.editor.defineTheme('light', {
          base: 'vs',
          inherit: true,
          rules: [
              { token: 'keyword', foreground: '0000FF', fontStyle: 'bold' },
              { token: 'operator', foreground: '888888' },
              { token: 'name', foreground: 'FF00FF' },
              { token: 'identifier', foreground: '111111' },
              { token: 'number', foreground: '00FF00' },
              { token: 'brackets', foreground: '111111' },
              { token: 'string', foreground: 'EB8E41' },
              { token: 'comment', foreground: '6AC270' },
          ],
          colors: {
            // "editor.background": '#394555',
            // "editorLineNumber.foreground": "#999999",
            // "editorLineNumber.activeForeground": "#FFFFFF" 
          }
      });
      
      monaco.editor.defineTheme('dark', {
        base: 'vs',
        inherit: true,
        rules: [
            { token: 'keyword', foreground: '0C27C6', fontStyle: 'bold' },
            { token: 'operator', foreground: 'DDDDDD' },
            { token: 'name', foreground: 'FF00FF' },
            { token: 'identifier', foreground: 'DDDDDD' },
            { token: 'number', foreground: '00FF00' },
            { token: 'brackets', foreground: '111111' },
            { token: 'string', foreground: 'EB8E41' },
            { token: 'comment', foreground: '3D9543' },
        ],
        colors: {
          "editor.background": '#394555',
          "editorLineNumber.foreground": "#999999",
          "editorLineNumber.activeForeground": "#FFFFFF" 
        }
    });
    }
  }, [monaco]);

  const markLineAsError = (error: Error) => {
    if (editorRef.current && monaco) {
        const model = editorRef.current.getModel();
        const parts = error.toString().split(":");
        const lineNumber = parseInt(parts[2]);
        const message = (parts.length > 2) ? parts.slice(3).join(':').trim() : "";
        if (!isNaN(lineNumber)) {
          const markers = [
            {
                severity: monaco.MarkerSeverity.Error,
                startLineNumber: lineNumber,
                endLineNumber: lineNumber, 
                startColumn: 1,
                endColumn: model.getLineLength(lineNumber) + 1,
                message: message,
            },
        ];
        monaco.editor.setModelMarkers(model, 'owner', markers);
        }
      }
      dispatch(
        setInputError({
          key: inputType,
          error: new Error(error.toString())
        })
      )
    };

    const deleteMarker = () => {
      if (editorRef.current && monaco) {
        const model = editorRef.current.getModel();
        monaco.editor.setModelMarkers(model, 'owner', []);
      }
    }

  if (monaco == null) return null;
  return (
    <div style={{ height: '70vh', outline: '1px solid #888888', marginTop: '20px', marginLeft: '1px', marginRight: '1px', marginBottom: '1px'}}>
      {glpkError&&
          <Alert
            severity='error'
          >
            {glpkError.toString()}
          </Alert>
        }
      <Editor
        height="70vh"
        defaultLanguage={format}
        theme={theme}
        options={{
          fontSize: 18,
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          autoSurround: 'languageDefined',
          autoIndent: 'advanced',
          formatOnType: true
        }}
        value={value}
        onChange={edit}
        onMount={(editor) => { editorRef.current = editor; }}
      />
      <ValidateEditor
        setMarker={markLineAsError}
        deleteMarker={deleteMarker}
        format={format} />
    </div>
  );
};

export default TextEditor;
