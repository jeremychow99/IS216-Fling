<template>
    <nav>
      <h1>Firebase Vuex Auth</h1>
  
      <!-- for all users -->
      <div>
        <router-link to="/">Home</router-link>
      </div>
  
      <!-- for logged in users -->
      <div>
        <button>Logout</button>
      </div>
  
      <!-- for logged out users -->
      <div>
        <router-link :to="{ name: 'Login' }">Login</router-link>
        <router-link :to="{ name: 'Signup'}">Signup</router-link>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
  
  }
  </script>