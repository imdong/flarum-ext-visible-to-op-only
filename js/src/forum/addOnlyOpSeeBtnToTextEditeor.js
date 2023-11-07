import {extend} from "flarum/common/extend";
import TextEditor from "flarum/common/components/TextEditor";
import TextEditorButton from "flarum/common/components/TextEditorButton";
import styleSelectedText from 'flarum/common/utils/styleSelectedText';

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
          {app.translator.trans("imdong-visible-to-op-only.forum.button_tooltip_only_op_see")}
        </TextEditorButton>
      );
    }
  })
}
