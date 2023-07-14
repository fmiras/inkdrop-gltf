import GLTFComponent from "./gltf";
import { markdownRenderer } from "inkdrop";
import CodeMirror from "codemirror";

const GLTF_MODE_INFO = {
  name: "gltf",
  mime: "message/http",
  mode: "http",
};

module.exports = {
  activate() {
    if (markdownRenderer) {
      markdownRenderer.remarkCodeComponents["gltf"] = GLTFComponent;
    }
    if (CodeMirror) {
      CodeMirror.modeInfo.push(GLTF_MODE_INFO);
    }
  },

  deactivate() {
    if (markdownRenderer) {
      const { remarkPlugins, remarkCodeComponents } = markdownRenderer;
      const i = remarkPlugins.indexOf(GLTFComponent);
      if (i >= 0) remarkPlugins.splice(i, 1);
      if (remarkCodeComponents.gltf === GLTFComponent) {
        delete remarkCodeComponents.gltf;
      }
    }
    if (CodeMirror) {
      const { modeInfo } = CodeMirror;
      const i = modeInfo.indexOf(GLTF_MODE_INFO);
      if (i >= 0) modeInfo.splice(i, 1);
    }
  },
};
