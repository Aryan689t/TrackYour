import React from "react";
import "./RevisionTip.css";

function RevisionTip() {
  return (
    <div className="revisionTip">
      <div className="tipContent">
        <h3 className="tipTitle">Revision Flag</h3>
        <p className="tipText">
          Mark any problem for revision. Problems marked as <strong>Revisit</strong> will appear in your revision list so you can practice them again later.
        </p>
      </div>
    </div>
  );
}

export default RevisionTip;