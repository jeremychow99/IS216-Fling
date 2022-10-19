<template>
    <div class="col-10 col-sm-10 col-lg-10">
        <div class="row align-items-center mt-3">
            <!-- Chats Row ()-->
            <div class="col">
                <strong class="fs-4">Chats</strong>
            </div>
            <!-- If bell column is needed.. -->
            <!-- <div class="col text-end">
                <i class="fa-solid fa-bell"></i>
            </div> -->
        </div>
        <!-- Search bar for chats -->
        <div class="row align-items-center mt-3">
            <form class="form-inline">
                <input class="form-control mr-sm-2" type="search" placeholder="Search for Chats" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>

        <div class="row align-items-center mt-3">
            <!-- stretch chat to take up whole row -->
            <div class="col-12 p-0">
                <div class="jumbotron bg-dark text-white px-5 m-0">
                    <div class="row">
                        <!-- picture on left, chat etc on right -->
                        <div class="col-1 my-auto ps-0">
                            <img src="https://placekitten.com/55/55" style="border-radius: 50%;">
                        </div>
                        <div class="col-11 ps-3">
                            <div class="d-inline">
                                Tan Ah Lian @xmm123 - 10/10/2022
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row align-items-center">
            <!-- stretch chat to take up whole row -->
            <div class="col-12 p-0">
                <div class="jumbotron bg-dark text-white px-5 m-0">
                    <div class="row">
                        <!-- picture on left, chat etc on right -->
                        <div class="col-1 my-auto ps-0">
                            <img src="https://placekitten.com/55/55" style="border-radius: 50%;">
                        </div>
                        <div class="col-11 ps-3">
                            <div class="d-inline">
                                Tan Ah Beng @beng123 - 14/9/2022
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {

    }
}
</script>