///ticket booking
var localStorage = window.localStorage;
var movie_title;
var movie_number;
var movie_date;
var movie_time;

var storage_value;

var selection = document.getElementById("rmvSelect") ; 

var  movieListSwitch = false;
function SaveTitle()
{
    InitializeSeat()
    var movie_list = document.getElementById("movie_list");
    movie_title = movie_list.options[movie_list.selectedIndex].value;
    console.log("this is movie_title : " ,movie_title);
}
function SaveNumber()
{
    InitializeSeat()
    var movie_number_list = document.getElementsByName("book-number");

    for (var i=0;i<movie_number_list.length;i++)
    {
        //노드리스트의 i 값을 이렇게 지정해 줘야 함 
        if(movie_number_list[i].checked == true)
        {
            movie_number = movie_number_list[i].value;
            console.log("this is movie number :", movie_number);
        }
    }
    for(var i =0;i<movie_number;i++)
    {
        book_seat_list[i] = 0;
    }
}
function SaveDate()
{
    InitializeSeat()
    var movie_date_list = document.getElementById("buyTicket-calender");
    movie_date = movie_date_list.value;
    console.log("this is Date : ", movie_date);
    SaveNumber();
}
function SaveTime()
{
    InitializeSeat()
    var movie_time_list = document.getElementById("movie_time");
    movie_time = movie_time_list.options[movie_time_list.selectedIndex].value;
    console.log("movie_time is :", movie_time);
    SaveNumber();
}

function SaveInfo()
{
    movieListSwitch = false;
    seats_stringify = "";
    if(!localStorage)
    {
        alert("localStorage is not supported");
    }
    var key_title = String(movie_title);
    var key_date = String(movie_date);
    var key_time = String(movie_time);
    var movie_value = String(book_seat_list);
    storage_value = key_title+"!"+key_date+"!"+key_time+"!"+movie_value;

    console.log(String(movie_title),String(movie_number),String(movie_date),String(movie_time),String(book_seat_list));
    if(confirm(`${movie_number}장의 티켓이 예매되었습니다 . 가격은 ${movie_number * 10000} 원 입니다.`))
    {

    
        console.log(book_seat_list);

        localStorage.setItem(localStorage.length,storage_value);
        ShowingSeatBooking();
    }
}
//seat booking
var book_seat_list = new Array();

function SaveSeat(clicked_Id)
{
    var seatChecker = 0;
    var fullChecker = false;
    console.log(book_seat_list.length);
    {
        for(var i=0;i<movie_number;i++)
        {
            if(book_seat_list[i] != 0)
            {
                seatChecker += 1;
                if(seatChecker == movie_number)
                {
                    alert("자리가 가득 찼습니다.");
                    fullChecker = true;
                }
            }
        }
    }
    if(fullChecker == false)
    {
        for(var i=0;i<movie_number;i++)
        {
            if(book_seat_list[i] == clicked_Id)
            {
                console.log(book_seat_list[i]);
                break;
            }
            else
            {
                if(book_seat_list[i] == 0)
                {
                    console.log("입력 : ", clicked_Id);
                    book_seat_list[i] = clicked_Id;
                    console.log(i);
                    var already_clicked_seat = document.getElementById(clicked_Id);
                    already_clicked_seat.style.backgroundColor = "white";
                    break;
                }
            }
        }
    }
}
function InitializeSeat()
{
    for(var i=0;i<movie_number;i++)
    {
        if(book_seat_list[i] != 0)
        {
            var clicked_seat = document.getElementById(book_seat_list[i]);
            clicked_seat.style.backgroundColor = "red";
            book_seat_list[i] = 0
        }
    }
}
function BookingList()
{ 
    var booking_contents = document.getElementById("booking-contents");
    for(var i = 0; i <= localStorage.length-1;i++)
    {
        var movie = localStorage.getItem(i);
        console.log(movie);
        var movieArray = movie.split("!");
        var newDiv = document.createElement("div");
        
        newDiv.setAttribute("class", "BookedList");
        newDiv.setAttribute("id",i);
        if(movieArray[0] == "carribean")
        {
            var Mname = "캐리비안의 해적";
        }
        else if(movieArray[0] == "rampage")
        {
            var Mname = "램페이지";
        }
        else if(movieArray[0] == "thor")
        {
            var Mname = "천둥의 신 토르";
        }
        else if(movieArray[0] == "transformer")
        {
            var Mname = "트랜스포머";
        }
        else if(movieArray[0] == "IronMan1")
        {
            var Mname = "아이언맨";
        }
        newDiv.innerHTML  = i+1 + " | " + Mname + " |  예약 날짜 : " + movieArray[1] + " | 예약 시간 : " + movieArray[2] + " | 좌석 : " + movieArray[3];
        booking_contents.appendChild(newDiv);
        var select = document.getElementById("rmvSelect");
        select.style.display = "visibility";
        var newOption = document.createElement("option");
        newOption.setAttribute("value",i);
        newOption.innerHTML = i + 1 + " : " + Mname;
        select.appendChild(newOption);
    
    }
    movieListSwitch = true;
}

function removeMovieList()
{
    var option_value = selection.options[selection.selectedIndex].value ;
    localStorage.removeItem(option_value);
    location.reload();
}
function removeAllMovieList()
{
    localStorage.clear();
    BookingList();
    location.reload();
}
function ShowingSeatBooking()
{
    var localData = new Array();
    for(var i =0 ; i < localStorage.length ; i++)
    { 
        console.log(localStorage.key(i));
    }
}
function CheckReserv()
{

}