import app from 'flarum/forum/app';
import {override} from "flarum/common/extend";
import ReplyComposer from "flarum/forum/components/ReplyComposer";
import {extPrefix, trans} from "../common";
import renderOnlyOpSee from "./renderOnlyOpSee";
import addOnlyOpSeeBtnToTextEditeor from "./addOnlyOpSeeBtnToTextEditeor";

app.initializers.add(extPrefix, () => {

  // 添加按钮到工具栏
  addOnlyOpSeeBtnToTextEditeor()

  // 各种前端渲染
  renderOnlyOpSee();

  // 包含空结构就不要提交了
  override(ReplyComposer.prototype, 'onsubmit', function (original, content) {
    if (/\[OP\]\s*\[\/OP\]/.test(content)) {
      app.alerts.show({
        type: "error",
      }, trans('forum.editor_empty_tips'));
      return false
    }

    original()
  })
});
