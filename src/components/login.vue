<template>
  <div class="container w-60 m-auto col-lg-6">
    <div class="container border border-dark mt-5">
        <div class="row">
          <h1 class="display-2 text-center">Fling</h1>
        </div>

        <div class="px-5 mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" class="form-control" id="username" />
        </div>

        <div class="px-5 mb-3">
          <label for="inputPassword" class="form-label">Password</label>
          <input type="password" class="form-control" id="inputPassword" />
        </div>

        <div class="row px-5">
          <button
            class="rounded btn btn-primary"
            onclick="location.href='main.html'"
          >
            Log In
          </button>
        </div>

        <div class="row">
          <!--make the text lighter-->
          <span class="text-center my-2">OR</span>
        </div>

        <div class="row px-5 mb-3">
          <button class="rounded btn btn-dark">Log In with Google</button>
        </div>

    </div>
    <!--end of container containing user login-->

    <div class="container border border-dark mt-3">
      <div class="row text-center">
        <span>Don't have an account? <a href="signup.html">Sign Up</a> </span>
      </div>
    </div>
  </div>
</template>

