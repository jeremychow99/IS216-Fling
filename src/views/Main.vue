<template>
    <div class="col-10 col-sm-10 col-lg-10">
        <div class="row align-items-center mt-3 position-sticky">
            <div class="col">
                <strong class="fs-4">Home</strong>
            </div>
        </div>
        <div class="row align-items-center mt-3">
            <form class="form-inline">
                <input class="form-control mr-sm-2" type="search" placeholder="Search for People/Events" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
        <div class="row justify-content-around mt-3">
            <!-- Contact cards should be in a new component -->
            <div class="col-12 col-md-6 col-lg-4 col-xl-4 mt-3">
                <div class="card mx-auto" style="width: 18rem;">
                    <img class="card-img-top" src="https://placekitten.com/100/70/" alt="Card image cap" id="pic1">
                    <div class="card-body">
                        <h5 class="card-title" id="name1">Ah Mao</h5>
                        <p class="card-text" id="details1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga sint hic velit? Fugiat temporibus voluptate quod, officia, nam harum repudiandae aliquam itaque iste beatae quam accusamus cumque quibusdam pariatur provident.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 col-lg-4 col-xl-4 mt-3">
                <div class="card mx-auto" style="width: 18rem;">
                    <img class="card-img-top" src="https://placekitten.com/100/70/" alt="Card image cap" id="pic2">
                    <div class="card-body">
                        <h5 class="card-title" id="name2">Ah Gou</h5>
                        <p class="card-text" id="details2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque quae porro sunt maiores velit ratione totam vel labore sed ipsa, ex quas nulla exercitationem debitis quasi. Expedita minima unde voluptate.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 col-lg-4 col-xl-4 mt-3">
                <div class="card mx-auto" style="width: 18rem;">
                    <img class="card-img-top" src="https://placekitten.com/100/70/" alt="Card image cap" id="pic3">
                    <div class="card-body">
                        <h5 class="card-title" id="name3">Card title</h5>
                        <p class="card-text" id="details3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
            <!-- CARDS ROW -->
            
        </div>
        

    </div>
</template>