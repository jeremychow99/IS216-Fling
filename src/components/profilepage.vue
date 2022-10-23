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
                <div class="px-5" style="background-image: url(../img/bg.jpeg)">
                    <img src="https://placekitten.com/150/150" class="py-3" style="border-radius: 50%;">
                </div>
                <div class="row">
                    <div class="profile-text px-5 py-3 clearfix">
                        <div class="profile-name clearfix">
                            <span id="name" class="display-6">Tan Ah Meng</span>
                            <button type="button" class="btn btn-outline-primary rounded-pill" style="float: right;">Edit profile</button>
                        </div>
                        <span id="username" class="pb-2 text-secondary"><h6>@tanxx</h6></span>
                        <button type="button" class="btn btn-outline-secondary rounded-pill">Cybersecurity</button>
                        <button type="button" class="btn btn-outline-secondary rounded-pill">AI</button>
                    </div>
                </div> 
                

                <!--for events-->
                <hr>

                <div class="row align-items-center mt-3 px-5">
                    <div class="header">
                        <h5>Events</h5>
                    </div>
                    <div class="col-12 col-md-6 col-lg-4 col-xl-4 mt-3">
                        <div class="card" style="width: 18rem;">
                            <img class="card-img-top" src="https://placekitten.com/100/70/" alt="Image of event" id="event_pic">
                            <div class="card-body">
                              <h5 class="card-title" id="event_name">Recruiting for Tic Tac Toe Hackathon</h5>
                              <p class="card-text" id="lister_name">Tan Ah Meng</p>                                  
                              <p class="card-text" id="event_details">Looking for 1 more person to join our team. More details...</p>
                              <p class="card-text" id="event_date">Listed on 10/10/2022</p>
                              <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
    
                    <div class="col-12 col-md-6 col-lg-4 col-xl-4 mt-3">
                        <div class="card" style="width: 18rem;">
                            <img class="card-img-top" src="https://placekitten.com/100/70/" alt="Image of event" id="event_pic2">
                            <div class="card-body">
                              <h5 class="card-title" id="event_name2">Recruiting for Toe Tac Tic Hackathon</h5>
                              <p class="card-text" id="lister_name2">Tan Ah Meng</p>                                  
                              <p class="card-text" id="event_details2">Looking for 3 more people to join our team. More details...</p>
                              <p class="card-text" id="event_date2">Listed on 20/10/2022</p>
                              <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-6 col-lg-4 col-xl-4 mt-3">
                        <div class="card" style="width: 18rem;">
                            <img class="card-img-top" src="https://placekitten.com/100/70/" alt="Image of event" id="event_pic2">
                            <div class="card-body">
                              <h5 class="card-title" id="event_name3">Recruiting for Toe Tac Tic Hackathon</h5>
                              <p class="card-text" id="lister_name3">Tan Ah Meng</p>                                  
                              <p class="card-text" id="event_details2">Looking for 3 more people to join our team. More details...</p>
                              <p class="card-text" id="event_date3">Listed on 20/10/2022</p>
                              <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
</script>