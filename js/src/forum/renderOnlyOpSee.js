import {override} from 'flarum/common/extend';
import Post from 'flarum/common/models/Post';
import {trans} from "../common";

function onlyOpSee(innerHTML, canViewHidePosts) {
  return innerHTML.replace(/<onlyopsee>(.*?)<\/onlyopsee>/gis, function (full, text) {
    return render(canViewHidePosts, text);
  })
}

function render(canViewHidePosts, text) {
  let title = trans(canViewHidePosts ? `forum.only_op_see` : 'forum.hidden_content_only_op_see')
  return `<div class="onlyopsee" data-title-content="${title}" >${text || ""}</div>`
}

export default function renderOnlyOpSee() {
  override(Post.prototype, 'contentHtml', function (original, content) {

    // 如果不能看见正文 就直接给拒绝文案
    if (!this.attribute('canViewPosts')) {
      return render(false)
    }

    // 否则替换正文
    return onlyOpSee(original(), this.attribute('canViewHidePosts'))
  });

  // 预览时
  override(s9e.TextFormatter, 'preview', (original, text, element) => {
    original(text, element);

    element.innerHTML = onlyOpSee(element.innerHTML, true)
  });

}
