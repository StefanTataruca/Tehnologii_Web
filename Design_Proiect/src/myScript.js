let selector = document.getElementById("city");
let result = document.getElementById("room-image");

selector.addEventListener("click", () => {
    // if default value is changed
      selector.addEventListener("change", () => {
      // if value switched by client
        switch (selector.value) {
            case "Timisoara":
                result.innerHTML = "<div class='card img-fluid' style='margin-top: 100px; border-radius: 50px;'><img class='card-img-top' src='src/Timisoara.jpeg' alt='Card image' style='width:100%; border-radius: 50px;'><div class='card-img-overlay'><h4 class='card-title'>Timisoara</h4><p class='card-text'>The price per hour is : 100$.</p></div></div>";
                break;
            case "Bucharest":
                result.innerHTML = "<div class='card img-fluid' style='margin-top: 100px; border-radius: 50px;'><img class='card-img-top' src='src/Bucharest.jpeg' alt='Card image' style='width:100%; border-radius: 50px;'><div class='card-img-overlay'><h4 class='card-title'>Bucharest</h4><p class='card-text'>The price per hour is : 200$.</p></div></div>";
                break;
            case "Cluj":
                result.innerHTML = "<div class='card img-fluid' style='margin-top: 100px; border-radius: 50px;'><img class='card-img-top' src='src/Cluj.jpeg' alt='Card image' style='width:100%; border-radius: 50px;'><div class='card-img-overlay'><h4 class='card-title'>Cluj</h4><p class='card-text'>The price per hour is : 150$. </p></div></div>";
                break;
            case "Arad":
                result.innerHTML = "<div class='card img-fluid' style='margin-top: 100px; border-radius: 50px;'><img class='card-img-top' src='src/Arad.jpeg' alt='Card image' style='width:100%; border-radius: 50px;'><div class='card-img-overlay'><h4 class='card-title'>Arad</h4><p class='card-text'>The price per hour is : 50$.</p></div></div>";
                break;
        }
      });
    });

