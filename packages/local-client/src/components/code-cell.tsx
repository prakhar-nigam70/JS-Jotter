import "./code-cell.css";
import React, { useEffect } from "react";
import CodeEditor from "../components/code-editor";
import Preview from "../components/preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/useActions";
import useTypedSelector from "../hooks/useTypedSelector";
import { useCumulativeCode } from "../hooks/useCumulativeCode";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles![cell.id]);

  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    // The below condition is for the first load, as we do not want to wait for 1sec for bundling process on the very first load, as that is for when user changes content. When first bundle is available, it will not enter this block of code.
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);
  return (
    <Resizable direction="vertical">
      <div style={{ display: "flex", height: "calc(100% - 10px)" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {(!bundle || bundle.loading) && (
            <div className="progress-cover">
              <progress className="progress is-primary is-small">
                Loading
              </progress>
            </div>
          )}
          <div
            style={{
              display: bundle?.loading ? "none" : "block",
              height: "100%",
            }}
          >
            {bundle && <Preview code={bundle.code} err={bundle.err} />}
          </div>
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
