<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>Chats</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2 col-sm-2 col-lg-2 pe-0">
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
                            <a href="chats.html">
                                <i class="fa-solid fa-message fs-3"></i>
                            </a>
                        </button>
                    </div>

                    <div class="my-3">
                        <!-- PROFILE_ICON <font-awesome-icon icon="fa-solid fa-user" /> for Vue -->
                        <button class="btn btn-default">
                            <!-- !TODO link change to profile -->
                            <a href="profilepage.html">
                                <i class="fa-solid fa-user fs-3"></i>
                            </a>
                        </button>
                    </div>
                    
                    <div class="profile_icon position-absolute fs-3" style="bottom:60px;">
                        <!-- PROFILE_PIC <font-awesome-icon icon="fa-solid fa-user" /> for Vue -->
                        <!-- REPLACE WITH PROFILE PICTURE -->
                        <button class="btn btn-default">
                            <!-- !TODO link change to profile -->
                            <a href="events.html">
                                <img src="https://placekitten.com/30/30" class="img-fluid" style="border-radius: 50%;">
                            </a>
                        </button>
                    </div>
                    <!-- Replace with username -->
                    <p class="fs-6 fw-light position-absolute" style="bottom:15px;">
                        @tanxx
                    </p>

                </div>

            </div>
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
            




    
</body>
</html>