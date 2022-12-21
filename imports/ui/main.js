import { Meteor } from 'meteor/meteor'
import { createApp } from 'vue'
import { VueMeteor } from 'vue-meteor-tracker'

import App from './App.vue'

Meteor.startup(() => {
  const app = createApp(App)
  app.use(VueMeteor)
  app.mount('#app')
})
