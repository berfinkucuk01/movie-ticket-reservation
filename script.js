const container=document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');


container.addEventListener('click', function(e) {
    if(e.target.classList.contains('seat')&& !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected'); //varsa siler yoksa ekler
        calculateTotal();
       
    }   
});

select.addEventListener('change', function(e){
  calculateTotal();
});

function calculateTotal(){
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function(seat) {
        selectedSeatsArr.push(seat);
    });

    selectedSeats.forEach(function(seat){
         seatsArr.push(seat);
    });

    let selectedSeatIndexs = selectedSeatsArr.map(function(seat){
       return seatsArr.indexOf(seat);  //seat içinden seçili elemanların index numaralarını yazdırır
    });
     
    

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;  //count içeriği seçili koltuk sayısı
    amount.innerText = selectedSeatCount * select.value; // amount içeriği optiondan (movie) seçilen value ile seçili koltuk adet sayısının çarpımı

    saveToLocalStorage(selectedSeatIndexs); //index numaralarını locale kaydetme

    function getFromLocalStorage(){
        const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

        if(selectedSeats !=null && selectedSeats.length > 0){
            seats.forEach(function(seat, index){
                if(selectedSeats.indexOf(index)> -1){
                    seat.classList.add('selected');
                }
            });
        }
        const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

        if(selectedMovieIndex != null ){
            select.selectedIndex = selectedMovieIndex;
        }
    }

    function saveToLocalStorage(indexs){
        localStorage.setItem('selectedSeats', JSON.stringify(indexs)); //  seçili koltukların index numaralarını JSON türünde kaydeder
        localStorage.setItem('selectedMovieIndex', select.selectedIndex); //seçili filmin index numarasını locale kaydeder.
    }
}
