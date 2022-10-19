<template>
        <div class="container w-60 m-auto col-lg-6">
        <div class="border border-dark mt-5">

            <div class="row">
                <h1 class="display-2 text-center">Fling</h1>
            </div>

            <div class="row px-5">
                <button class="rounded btn btn-dark w-90">Log In with Google</button>
            </div>

            <div class="row"> <!--make the text lighter-->
                <span class="text-center my-2">OR</span>
            </div>  

            <div class="px-5 mb-3"> <!--email-->
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
            </div>

            <div class="px-5 mb-3">
                <label for="fullname" class="form-label">Full name</label>
                <input type="text" class="form-control" id="fullname" placeholder="John Doe">
            </div>

            <div class="px-5 mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" placeholder="johndoe">
            </div>
            
            <div class="px-5 mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="inputPassword">
            </div>

            <div class="row px-5 mb-3">
                <button class="rounded btn btn-primary w-90" onclick="location.href='profilepic.html'">Sign Up</button>
            </div>

        </div>
    </div>
</template>