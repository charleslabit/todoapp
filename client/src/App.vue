<template>
  <v-app>
    <v-app-bar app :color="!isDarkTheme ? '#1565c0' : 'black'" dark>
      <span :class="$vuetify.breakpoint.width <= 300 ? '' : 'headline'"
        >Todo Application</span
      >

      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon @click="truncateData()" v-on="on" class="spinner">
            <v-icon>mdi-recycle</v-icon>
          </v-btn>
        </template>
        <span>
          Delete All Data

        </span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon @click="CHANGE_THEME(isDarkTheme)" v-on="on">
            <v-icon v-model="isDarkTheme">{{
              !isDarkTheme ? "mdi-weather-night" : "mdi-weather-cloudy"
            }}</v-icon>
          </v-btn>
        </template>
        <span>
          {{ isDarkTheme ? "Light Mode" : "Dark Mode" }}
        </span>
      </v-tooltip>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "App",

  data: () => ({
    //
  }),
  methods: {
    truncateData() {
      Swal.fire({
        title: "Are you sure?",
        text: "It will delete all the data !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, Confirm!`,
      }).then((result) => {
        if (result.value) {
          this.TRUNCATE_TODO_ITEMS();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Data has been succesfully deleted !",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.spinner {
  -webkit-animation: spin 4s linear infinite;
  -moz-animation: spin 4s linear infinite;
  animation: spin 4s linear infinite;
}
@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
