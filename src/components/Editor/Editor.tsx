"use client";

import React, { useEffect } from 'react';
import { useMonaco, Editor, OnChange } from '@monaco-editor/react';
import { FileFormat } from '../Converter/FileFormat';

const TextEditor = ({ value, edit, format, theme}: {
    value: string;
    edit: OnChange;
    format: FileFormat;
    theme: string;
}) => {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.languages.register({ id: FileFormat.GMPL.toString() });

      monaco.languages.setMonarchTokensProvider(FileFormat.GMPL.toString(), {
        ignoreCase:false,
        tokenizer: {
          root: [
            [/\b(var|maximize|minimize|solve|display|end|param|set|dimen|setofbinary|sum|in|printf|data)\b|s\.t\./, 'keyword'],
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

      monaco.languages.register({ id: FileFormat.CPLEX_LP.toString() });

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
          colors: {}
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

  if (monaco == null) return null;
  return (
    <div style={{ height: '70vh', outline: '1px solid #888888', marginTop: '20px', marginLeft: '1px', marginRight: '1px', marginBottom: '1px'}}>
      <Editor
        height="70vh"
        defaultLanguage={format}
        theme={theme}
        options={{fontSize: 18}}
        value={value}
        onChange={edit}
      />
    </div>
  );
};

export default TextEditor;
