

var doSi=['서울특별시','인천광역시','경기도'];



var Seoul=`강남구, 강동구, 강북구, 강서구, 관악구, 
광진구, 구로구, 금천구, 노원구, 도봉구, 동대문구, 동작구, 
마포구, 서대문구, 서초구, 성동구, 성북구, 송파구, 
양천구, 영등포구, 용산구, 은평구, 종로구, 중구, 중랑구`;
var Seoul_array = Seoul.split(", ");
var incheon = '계양구, 미추홀구, 남동구, 동구, 부평구, 서구, 연수구, 중구';
var incheon_array = incheon.split(", ");
var gyeogi_array =  `수원시 권선구, 수원시 영통구, 수원시 장안구, 수원시 팔달구, 성남시 분당구, 성남시 수정구, 성남시 중원구, 
안양시 동안구, 안양시 만안구, 고양시 덕양구, 고양시 일산동구, 고양시 일산서구, 안산시 단원구, 안산시 상록구, 용인시 기흥구, 용인시 수지구, 
용인시 처인구`.split(", ");


function changeFunc() {
    var selectBox = document.getElementById("doSi");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    var gg =document.getElementById('gu');
    
    
    while (gu.hasChildNodes()){
        gu.removeChild(gu.firstChild);
    }  

    var op1 = document.createElement("option");
    op1.value="구";
    gu.appendChild(op1);
    gu.removeChild(gu.firstChild);
    

        if(selectedValue=="서울특별시"){
            for(var i =0; i< Seoul_array.length;i++){
                var op = document.createElement("option");
                op.text=Seoul_array[i];
                op.value=Seoul_array[i];
                gu.appendChild(op);
            }
            
        }
        if(selectedValue=="인천광역시"){
            for(var i =0; i< incheon_array.length;i++){
                var op = document.createElement("option");
                op.text=incheon_array[i];
                op.value=incheon_array[i];
                gu.appendChild(op);
            }
        }
        if(selectedValue=="경기도"){
            for(var i =0; i< gyeogi_array.length;i++){
                var op = document.createElement("option");
                op.text=gyeogi_array[i];
                op.value=gyeogi_array[i];
                gu.appendChild(op);
            }
        }
   }

