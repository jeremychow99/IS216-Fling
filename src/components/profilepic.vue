<template>
     <div class="container mt-3 col-lg-6">
        <h1 class="text-center">
            Setting Up Your Profile
        </h1>
        <!--preview of profile picture-->
        <img src="https://placekitten.com/300/300" class="mx-auto d-block my-2" style="border-radius: 50%">


        <div class="mb-3">
            <div class="input-group">
                <input type="file" class="form-control" id="formFile" aria-describedby="inputGroupFileAddon04" accept="image/*" aria-label="Upload">
                <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Upload</button>
            </div>    
        </div>

        <div class="links" style="display: flex; justify-content: space-between;">
            <a href="interests.html">Not now</a>
            <button class="rounded btn btn-primary" onclick="location.href='interests.html'">Next</button>
        </div>
    </div>
</template>

<script>
    
</script>