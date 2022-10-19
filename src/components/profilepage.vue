<template>
<div class="container-fluid">
        <div class="row">
            <div class="col-1 col-sm-1 col-lg-1 pe-0">
                <div class="left-navbar d-flex flex-column border-end position-sticky" style="height:100vh; align-items: center;" id="left-navbar">
                    <div>
                        <!-- APP_ICON Replace with app image  -->
                        <button class="btn btn-default">
                            <a href="main.html">
                                <img src="public/favicon.ico" class= "fs-3 mt-3">
                            </a>
                        </button>
                    </div>
                    <!-- ICONS from FONTAWESOME -->
                    <div class="my-3">
                        <!-- HOME_ICON <font-awesome-icon icon="fa-solid fa-house-user" /> for Vue -->
                        <button class="btn btn-default">
                            <a href="main.html">
                                <i class="fa-solid fa-house-user fs-3" ></i>
                            </a>
                        </button>
                    </div>
                    
                    <div class="my-3">
                        <!-- EVENTS_ICON <font-awesome-icon icon="fa-solid fa-calendar-days" /> for Vue -->
                        <button class="btn btn-default">
                            <a href="events.html">
                                <i class="fa-solid fa-calendar-days fs-3"></i>
                            </a>
                        </button>
                    </div>
    
                    <div class="my-3">
                        <!-- MESSAGES_ICON <font-awesome-icon icon="fa-solid fa-message" /> for Vue -->
                        <button class="btn btn-default">
                            <!-- !TODO link change to messages -->
                            <a href="events.html">
                                <i class="fa-solid fa-message fs-3"></i>
                            </a>
                        </button>
                    </div>
    
                    <div class="my-3">
                        <!-- PROFILE_ICON <font-awesome-icon icon="fa-solid fa-user" /> for Vue -->
                        <button class="btn btn-default">
                            <!-- !TODO link change to profile -->
                            <a href="events.html">
                                <i class="fa-solid fa-user fs-3"></i>
                            </a>
                        </button>
                    </div>
                    
                    <div class="profile_icon position-fixed fs-3" style="bottom:60px;">
                        <!-- PROFILE_PIC <font-awesome-icon icon="fa-solid fa-user" /> for Vue -->
                        <!-- REPLACE WITH PROFILE PICTURE -->
                        <button class="btn btn-default">
                            <!-- !TODO link change to profile -->
                            <a href="profilepage.html">
                                <img src="https://placekitten.com/30/30" class="img-fluid" style="border-radius: 50%;">
                            </a>
                        </button>
                    </div>
                    <!-- Replace with username -->
                    <div class="fs-6 fw-light position-fixed" style="bottom:15px;">
                        @tanxx
                    </div>
                </div>
            </div>
    
    
            <div class="col-11 col-sm-11 col-lg-11 p-0">
                <div class="jumbotron bg-secondary px-5 m-0">
                    <img src="https://placekitten.com/150/150" style="border-radius: 50%;">
                    <h6 id="name">Tan Ah Meng</h6>
                    <p id="username">@tanxx</p>
                </div>
            </div>
        </div>

    </div>
</template>