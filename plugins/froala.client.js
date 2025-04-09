// Import only on client
import VueFroala from 'vue-froala-wysiwyg';

// Froala Editor JS and CSS
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/themes/gray.min.css';

// jQuery (required)
import jQuery from 'jquery';

if (process.client) {
  window.$ = window.jQuery = jQuery;
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueFroala);
});

