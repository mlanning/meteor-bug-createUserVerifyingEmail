<template>
  <div class="container">
    <Instructions />
    <form @submit.prevent="submitForm">
      <label for="username"> username: </label>
      <input id="username" type="text" v-model="username" />
      <label> email:
        <input type="text" v-model="email" />
      </label>
      <label for="password"> password: </label>
      <input id="password" type="password" v-model="password" />
      <button type="submit" @click="submitForm">Create Account</button>
    </form>
    <hr />
    <pre> Number of users in the database: {{ userCount }}</pre>
    <button type="button" @click="toggleShowUsers">Show users</button>
  </div>
  <pre v-if="showUsers">{{ users }}</pre>
</template>

<script>
import { Meteor } from "meteor/meteor";
import Instructions from "./Instructions.vue";

export default {
  components: { Instructions },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      showUsers: false
    };
  },
  meteor: {
    $subscribe: {
      allUsers: [],
    },
  },
  computed: {
    userCount() {
      if (this.$subReady.allUsers) {
        const users = Meteor.users.find({}).count();
        return users;
      }
    },
    users() {
      if (this.$subReady.allUsers) {
        const users = Meteor.users.find({}).fetch();
        return users;
      }
    },
  },
  methods: {
    submitForm() {
      Meteor.call(
        "createUserAccount",
        {
          username: this.username,
          email: this.email,
          password: this.password,
        },
        error => {
          if (error) {
            console.log(error);
            alert(error.reason);
          } else {
            console.log("User was created?.. check the database to make sure.");
          }
        }
      );
    },
    toggleShowUsers() {
      this.showUsers = !this.showUsers;
    }
  },
};
</script>

<style>
.container {
  padding: 20px;
}

hr {
  margin: 20px 0;
}

input {
  display: block;
  border: 1px solid grey;
  padding: 5px;
  width: 300px;
}

button {
  border: 1px solid grey;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 20px 0;
}

pre {
  font-size: 12px;
}
</style>
