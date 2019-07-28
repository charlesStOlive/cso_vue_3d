<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      v-if="scenes_ready"
    >
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>fa-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Accueil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item 
        v-for="scene in scenes"
        :key="scene.id"
        :to="{ name: 'scenes', params: { slug: scene.slug }}
        ">
          <v-list-item-action>
            <v-icon>fa-cubes</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ scene.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
        <router-view></router-view>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  computed: {
      ...mapGetters({
        scenes_ready : 'troisd/scenes_ready',
        scenes : 'troisd/scenes',
      })
    },
}
</script>
