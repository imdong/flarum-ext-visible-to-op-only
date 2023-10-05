import app from 'flarum/admin/app';

app.initializers.add('imdong-visible-to-op-only', () => {

  app.extensionData
    .for('imdong-visible-to-op-only')
    .registerPermission(
      {
        icon: 'fas fa-user-shield',
        label: app.translator.trans('imdong-visible-to-op-only.admin.permissions.view-post'),
        permission: 'discussion.viewPosts',
      },
      'view'
    );

});
