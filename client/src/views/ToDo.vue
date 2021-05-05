<template>
  <v-container fluid pa-0 ma-0>
    <v-theme-provider root :dark="isDarkTheme">
      <v-card class="ma-3">
        <v-toolbar :color="!isDarkTheme ? '#1565c0' : 'black'" dark>
          <v-toolbar-title class="headline">
            <span class="hidden-sm-and-down"> Things to do today </span>
            <span class="hidden-md-and-up">Todo List</span>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-badge
            class="hidden-sm-and-down mr-4"
            v-if="selectedStatus != 'ALL'"
            overlap
            :color="!isDarkTheme ? 'pink' : 'black'"
            :content="computedTodoItems.length"
          >
            <v-btn small text style="border:solid 1px; cursor: context-menu">
              Total
              <v-icon>mdi-calendar-check-outline</v-icon>
            </v-btn>
          </v-badge>

          <v-badge
            class="hidden-md-and-up mr-4"
            v-if="selectedStatus != 'ALL'"
            overlap
            :color="!isDarkTheme ? 'pink' : 'black'"
            :content="computedTodoItems.length"
          >
            <v-icon>mdi-calendar-check-outline</v-icon>
          </v-badge>
          <!-- Ongoing -->
          <v-badge
            class="hidden-sm-and-down mr-4"
            v-if="selectedStatus == 'ALL'"
            overlap
            :color="!isDarkTheme ? 'pink' : 'black'"
            :content="computedTodoOngoing.length"
          >
            <v-btn
              small
              text
              style="border:solid 1px; cursor: context-menu"
              @click="selectedStatus = 'ONGOING'"
            >
              Ongoing
              <v-icon>mdi-progress-clock</v-icon>
            </v-btn>
          </v-badge>

          <v-badge
            class="hidden-md-and-up mr-4"
            v-if="selectedStatus == 'ALL'"
            :color="!isDarkTheme ? 'pink' : 'black'"
            :content="computedTodoOngoing.length"
          >
            <v-icon @click="selectedStatus = 'ONGOING'"
              >mdi-progress-clock</v-icon
            >
          </v-badge>

          <!-- Finished -->
          <v-badge
            class="ml-3 hidden-sm-and-down mr-4"
            v-if="selectedStatus == 'ALL'"
            overlap
            :color="!isDarkTheme ? 'pink' : 'black'"
            :content="computedTodoFinished.length"
          >
            <v-btn
              small
              text
              style="border:solid 1px; cursor: context-menu"
              @click="selectedStatus = 'FINISHED'"
            >
              Finished
              <v-icon>mdi-check-outline</v-icon>
            </v-btn>
          </v-badge>

          <v-badge
            class="ml-3 hidden-md-and-up mr-4"
            v-if="selectedStatus == 'ALL'"
            :color="!isDarkTheme ? 'pink' : 'black'"
            :content="computedTodoFinished.length"
          >
            <v-icon @click="selectedStatus = 'FINISHED'"
              >mdi-check-outline</v-icon
            >
          </v-badge>
        </v-toolbar>

        <v-row dense no-gutters class="ma-2">
          <v-col lg="4" md="4" sm="12" cols="12">
            <v-text-field
              style="width:95%"
              class="pt-2"
              rounded
              outlined
              dense
              hide-details
              append-icon="mdi-format-list-checks"
              v-model="newTodo"
              id="newTodo"
              name="newTodo"
              label="Type your task"
              @keyup.enter="addTodo"
            />
          </v-col>
          <v-col lg="4" md="4" sm="12" cols="12">
            <v-text-field
              style="width:95%"
              class="pt-2"
              v-model="searchText"
              append-icon="mdi-magnify"
              small
              label="Search"
              clearable
              rounded
              outlined
              dense
              hide-details
            >
            </v-text-field>
          </v-col>
          <v-col lg="4" md="4" sm="12" cols="12">
            <v-select
              style="width:95%"
              class="pt-2"
              v-model="selectedStatus"
              label="Status"
              :items="statusList"
              outlined
              rounded
              dense
              hide-details
            >
            </v-select>
          </v-col>
        </v-row>

        <v-list
          style="overflow-y: scroll"
          :height="$vuetify.breakpoint.height - 270"
        >
          <v-subheader v-if="computedTodoItems.length == 0"
            >You have 0 Tasks, add some</v-subheader
          >
          <v-subheader v-else>Your Tasks</v-subheader>

          <v-list-item-group>
            <v-list-item
              v-for="(todo, i) in pageData"
              :key="i"
              :class="isDarkTheme ? 'dark' : 'light'"
            >
              <v-list-item-content
                :style="todo.done ? 'text-decoration: line-through' : ''"
              >
                <v-list-item-title>
                  {{ todo.title }}
                </v-list-item-title>

                <v-list-item-subtitle
                  >Added on: {{ todo.updatedDate }}</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-btn
                v-if="!todo.done"
                fab
                small
                :color="!isDarkTheme ? '#1565c0' : 'white'"
                @click="removeTodo(i)"
              >
                <v-icon :class="!isDarkTheme ? 'white--text' : 'black--text'"
                  >mdi-close</v-icon
                >
              </v-btn>
              <v-btn
                v-if="!todo.done"
                fab
                small
                :color="!isDarkTheme ? '#1565c0' : 'white'"
                @click="editTodo(i)"
              >
                <v-icon :class="!isDarkTheme ? 'white--text' : 'black--text'"
                  >mdi-check</v-icon
                >
              </v-btn>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-theme-provider>
    <v-pagination
      v-model="pageNumber"
      :length="pageLength"
      :total-visible="5"
      dark
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </v-container>
</template>

<script>
import moment from "moment";
import Swal from "sweetalert2";
export default {
  name: "Home",

  components: {},

  data() {
    return {
      // isDarkTheme: true,
      pageNumber: 1,
      pageRow: 20,
      newTodo: "",
      searchText: "",
      // todoItems: [],
      selectedStatus: "ALL",
      statusList: ["ALL", "ONGOING", "FINISHED"],
    };
  },
  created() {},
  watch: {
    searchText() {
      this.pageNumber = 1;
    },
    selectedStatus() {
      this.pageNumber = 1;
    },
  },
  methods: {
    addTodo() {
      if (!this.newTodo.trim()) {
        return;
      }

      // this.todoItems.push({
      //   title: this.newTodo,
      //   done: false,
      //   updatedDate: moment().format("MMMM Do YYYY, h:mm:ss a"),
      // });
      this.ADD_TODO_ITEMS({
        title: this.newTodo,
        done: false,
        updatedDate: moment().format("MMMM Do YYYY, h:mm:ss a"),
      });

      this.newTodo = "";
    },

    editTodo(index) {
      Swal.fire({
        title: "Are you sure?",
        text: "It will be mark as finished !",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, Confirm!`,
      }).then((result) => {
        if (result.value) {
          this.TOGGLE_TODO_ITEMS(index);

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully Save !",
            showConfirmButton: false,
            timer: 750,
          });
        }
      });
    },

    removeTodo(index) {
      Swal.fire({
        title: "Are you sure?",
        text: "It will be deleted permanently !",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, Confirm!`,
      }).then((result) => {
        if (result.value) {
          // this.todoItems.splice(index, 1);
          this.REMOVE_TODO_ITEMS(index);

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Deleted Successfully !",
            showConfirmButton: false,
            timer: 750,
          });
        }
      });
    },
  },
  computed: {
    pageLength() {
      let l = this.computedTodoItems.length,
        s = this.pageRow;
      return Math.ceil(l / s);
    },
    pageData() {
      const start = (this.pageNumber - 1) * this.pageRow,
        end = start + this.pageRow;
      return this.computedTodoItems.slice(start, end);
    },

    computedTodoItems() {
      return this.todoItems
        .filter((rec) => {
          if (this.searchText) {
            return rec.title.includes(this.searchText);
          } else {
            return rec;
          }
        })
        .filter((rec) => {
          if (this.selectedStatus == "ALL") {
            return rec;
          } else if (this.selectedStatus == "FINISHED") {
            return rec.done;
          } else {
            return !rec.done;
          }
        });
    },

    computedTodoOngoing() {
      return this.todoItems.filter((rec) => {
        return !rec.done;
      });
    },
    computedTodoFinished() {
      return this.todoItems.filter((rec) => {
        return rec.done;
      });
    },
  },
};
</script>
<style>
.light {
  margin: 5px;
  border-radius: 4px;
}
.light:hover {
  background: #9ff6fc;
}

.dark {
  margin: 5px;
  border-radius: 4px;
}
.dark:hover {
  background: gray;
}
</style>
