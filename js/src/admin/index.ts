import app from 'flarum/admin/app';
import common from "../common";

app.initializers.add(common.extPrefix, () => {
  app.extensionData
    .for(common.extPrefix)
    // 添加权限 查看回复
    .registerPermission(
      {
        icon: 'fas fa-user-shield',
        label: app.translator.trans(common.extPrefix + '.admin.permissions.view-post'),
        permission: `discussion.${common.extPrefix}.viewPosts`,
        allowGuest: true,
      },
      'view'
    )
    // 添加权限 查看回复隐藏内容
    .registerPermission(
      {
        icon: 'far fa-eye',
        label: app.translator.trans(common.extPrefix + '.admin.permissions.view-hide-post'),
        permission: `discussion.${common.extPrefix}.viewHidePosts`,
      },
      'start'
    )
    // 注册配置 允许查看置顶帖
    .registerSetting({
      setting: common.extPrefix + '.allowViewSticky',
      type: 'boolean',
      label: app.translator.trans(common.extPrefix + '.admin.settings.allow-view-sticky'),
      help: app.translator.trans(common.extPrefix + '.admin.settings.allow-view-sticky-text'),
    })
});
