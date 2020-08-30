import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { NgForOf } from '@angular/common';
import { of } from 'rxjs';
import { mergeMap,map, groupBy, reduce } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tempArr:any;
  data=[];
  cnt:number=0;
  newarr = [];
  display:any=[];
  values:any[];
  finaldata = [];
  percentage:number =0;
  dropdownoption =['salarySlab', 'city', 'department', 'country'];
  selecteddropdownoption='department';

  constructor(public fb: FormBuilder) { 
    of(
      {
        "id": 1,
        "firstName": "David",
        "lastName": "Wallace",
        "department": "Mobile",
        "salarySlab": "High",
        "city": "New York",
        "country": "US"
        },
        {
        "id": 2,
        "firstName": "Sonia",
        "lastName": "Ross",
        "department": "Web",
        "salarySlab": "Low",
        "city": "Texas",
        "country": "US"
        },
        {
        "id": 3,
        "firstName": "Anthony",
        "lastName": "Thomson",
        "department": "Web",
        "salarySlab": "High",
        "city": "London",
        "country": "UK"
        },
        {
        "id": 4,
        "firstName": "John",
        "lastName": "Duo",
        "department": "Web",
        "salarySlab": "Low",
        "city": "Liverpool",
        "country": "UK"
        }
    ).pipe(
      groupBy(dep => dep.department),
      mergeMap((group$) => group$.pipe(reduce((acc, cur) => [...acc, cur], []))),
    )
    .subscribe(dep =>
      {
        //Group By department
        this.newarr = [];
        console.log("LEN:"+ dep[0]["department"]);
        this.newarr["group"] =  dep[0]["department"];
        this.newarr["user"] =  dep.length;
        this.newarr["per"] =   (dep.length*100) / of.length;
        
        var finalarr = this.newarr;
        this.finaldata = this.finaldata.concat ( Array.of(finalarr));
        console.log(this.finaldata);
       
      }
      );

    
  }


  ngOnInit(): void {
  }

//when dropdown value change this event called
  onChange(newValue) { 
    //remove older row data 
    var elements =document.getElementsByClassName("row");
    for(var i=0; i<elements.length; i++) {
      elements[i].remove();
    }
    this.selecteddropdownoption = newValue;
    of(
      {
        "id": 1,
        "firstName": "David",
        "lastName": "Wallace",
        "department": "Mobile",
        "salarySlab": "High",
        "city": "New York",
        "country": "US"
        },
        {
        "id": 2,
        "firstName": "Sonia",
        "lastName": "Ross",
        "department": "Web",
        "salarySlab": "Low",
        "city": "Texas",
        "country": "US"
        },
        {
        "id": 3,
        "firstName": "Anthony",
        "lastName": "Thomson",
        "department": "Web",
        "salarySlab": "High",
        "city": "London",
        "country": "UK"
        },
        {
        "id": 4,
        "firstName": "John",
        "lastName": "Duo",
        "department": "Web",
        "salarySlab": "Low",
        "city": "Liverpool",
        "country": "UK"
        }
    ).pipe(  
      //Group by according city 
      groupBy(city => {
        if(newValue=='city'){
          return city.city
        }
         //Group by according country
        if(newValue=='country'){
          return city.country
        }
         //Group by according salaryslab 
        if(newValue=='salarySlab'){
          return city.salarySlab
        }
         //Group by according department
        if(newValue=='department'){
          return city.department
        }
      }),
      mergeMap((group$) => group$.pipe(reduce((acc, cur) => [...acc, cur], []))),
    )
    .subscribe(city =>
      { 
        this.newarr = [];
        console.log("LEN:"+ city[0]["city"]);
        this.newarr["group"] =  city[0]["city"];
        this.newarr["user"] =  city.length;
        this.newarr["per"] =   (city.length*100) / of.length;
        
        var finalarr = this.newarr;
        this.finaldata = this.finaldata.concat ( Array.of(finalarr));
        console.log(this.finaldata);
       
      
    }
      );
    
  }
}
