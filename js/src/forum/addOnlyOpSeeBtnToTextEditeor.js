import {extend} from "flarum/common/extend";
import TextEditor from "flarum/common/components/TextEditor";
import TextEditorButton from "flarum/common/components/TextEditorButton";
import styleSelectedText from 'flarum/common/utils/styleSelectedText';
import {trans} from "../common";

const style = {prefix: '[OP]', suffix: '[/OP]', trimFirst: true};

export default function addOnlyOpSeeBtnToTextEditeor() {
  extend(TextEditor.prototype, 'toolbarItems', function (items) {
    if (app.composer.body.attrs.discussion || app.composer.body.attrs.post) {
      items.add(
        "only-op-see",
        <TextEditorButton
          onclick={() => styleSelectedText(this.attrs.composer.editor.el, style)}
          icon="fas fa-user-shield"
        >
          {trans("forum.button_tooltip_only_op_see")}
        </TextEditorButton>
      );
    }
  })
}
