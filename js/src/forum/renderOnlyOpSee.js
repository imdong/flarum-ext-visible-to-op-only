import {override} from 'flarum/common/extend';
import Post from 'flarum/common/models/Post';
import app from 'flarum/forum/app';

function onlyOpSee(innerHTML, canViewHidePosts) {
  // console.log(innerHTML, canViewHidePosts)
  return innerHTML.replace(/<onlyopsee>(.*?)<\/onlyopsee>/g, function (full, text) {
    return canViewHidePosts ? allow(text) : deny();
  })
}

function allow(text) {
  let title = app.translator.trans('imdong-visible-to-op-only.forum.only_op_see')
  return `<div class="onlyopsee"><div class="onlyopsee_title">${title}</div>${text}</div>`
}

function deny() {
  let title = app.translator.trans('imdong-visible-to-op-only.forum.hidden_content_only_op_see')
  return `<div class="onlyopsee"><div class="onlyopsee_alert">${title}</div></div>`
}

export default function renderOnlyOpSee() {
  override(Post.prototype, 'contentHtml', function (original, content) {
    // console.log(this.attribute('content', 'contentHtml'))

    // 如果不能看见正文 就直接给拒绝文案
    if (!this.attribute('canViewPosts')) {
      return deny()
    }

    // 否则替换正文
    return onlyOpSee(original(), this.attribute('canViewHidePosts'))
  });

  override(s9e.TextFormatter, 'preview', (original, text, element) => {
    original(text, element);

    element.innerHTML = onlyOpSee(element.innerHTML, true)
  });

}
