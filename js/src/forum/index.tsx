import app from 'flarum/forum/app';
import {extend} from "flarum/common/extend";
import TextEditor from "flarum/common/components/TextEditor";
import TextEditorButton from "flarum/common/components/TextEditorButton";


app.initializers.add('imdong/flarum-ext-visible-to-op-only', () => {
  extend(TextEditor.prototype, 'toolbarItems', function (items) {
    if (app.composer.body.attrs.discussion) {
      items.add(
        "only-op-see",
        <TextEditorButton
          onclick={() => {
            const range = this.attrs.composer.editor.getSelectionRange(),
              select_str = app.composer.editor.el.value.substring(range[0], range[1]);
            console.log(range, select_str)

            // 获取选中的内容
            this.attrs.composer.editor.insertBetween(range[0], range[1], `[OP]${select_str}[/OP]`);
            this.attrs.composer.editor.moveCursorTo(range[1] + select_str.length + 1);
          }}
          icon="fas fa-user-shield"
        >
          {app.translator.trans("imdong-visible-to-op-only.forum.button_tooltip_only_op_see")}
        </TextEditorButton>
      );
    }

  })

});
