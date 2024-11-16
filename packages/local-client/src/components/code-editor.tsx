import { useRef } from 'react';
import MonacoEditor, {EditorDidMount} from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css';
import './syntax.css';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
    initialValue: string,
    onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({initialValue, onChange}) => {
    const editorRef = useRef<any>();
    //We have this function that runs on every mount of the editor component
    // It receives getValue fn as the first argument, which returns the content inside the editor as string
    // Second arg is a reference to the editor itself.
    //But it will not be called on every change of editor content, so we have to set an event Listener on the editor itself.
    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
        })

        monacoEditor?.getModel()?.updateOptions({tabSize: 2});

        const highlighter = new Highlighter(
            // @ts-ignore
            window.monaco,
            codeShift,
            monacoEditor
        )

        highlighter.highLightOnDidChangeModelContent(
            () => {},
            () => {},
            undefined,
            () => {}
        );
    }

    const handleFormatClick = () => {
        //get the current value from the editor
        const unformatted = editorRef.current.getModel().getValue();
        //format the value, replace new line character at the very end, added by prettier, with an empty string.
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            semi: true,
            useTabs: false,
            singleQuote: true
        }).replace(/\n$/, '');
        //put the formatted value back in the editor
        editorRef.current.getModel().setValue(formatted);
    }

    return (
        <div className='editor-wrapper'>
            <button className='button button-format is-small is-primary' onClick={handleFormatClick}>Format</button>
            <MonacoEditor
            editorDidMount={onEditorDidMount}
            value={initialValue}
            height='100%'
            theme='dark'
            language='javascript'
            // width='60%'
            options={{
                wordWrap: "on",
                minimap: {enabled: true}, //Put later wrt device screen size or a button to enable it.
                lineNumbersMinChars: 3,
                folding: false,
                fontSize: 16,
                scrollBeyondLastLine: false,
                showUnused: true,
                automaticLayout: true,
                scrollbar: {
                    alwaysConsumeMouseWheel: false
                }
            }}
            />
    </div>
    )
}

export default CodeEditor;