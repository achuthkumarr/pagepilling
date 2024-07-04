import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-page-piling',
  templateUrl: './page-piling.component.html',
  styleUrl: './page-piling.component.css',
  animations: [
    trigger("fadeAnimation", [
      transition("false=>true", [
        style({ opacity: 0 }),
        animate("500ms", style({ opacity: 1 }))
      ]),
      //when we write '500ms  100ms' means that the animation spend 500ms, and start afer 100ms
      transition("true=>false", [animate("500ms 1000ms", style({ opacity: 0 }))])
    ])
  ]
})
export class PagePilingComponent {
  @ViewChild("wordCarousel", { static: false }) wordCarouselEl: ElementRef ;
  sections = [{"id":1,"value":"Home"},{"id":2,"value":"Studio"},
               {"id":3,"value":"Tracks"},{"id":4,"value":"Catalysts"},
               {"id":5,"value":"About"},{"id":6,"value":"iRise"}
  ]

  wordCarousel = ["PARTNER.!", "COFOUNDER.!"];

  currSecIdx = 1;
  isScrolling = false;
  changingText = "";
  cursor = "";
  index = 0;
  charIndex = 0;
  currentText = '';
  isDeleting = false;
  page="";
  wordCounter = -1;
  toogle:boolean=true;

  ngAfterViewInit() {
    setTimeout(()=>{
    this.toogle=false;
    })
  }
  nextWord(event: any) {
      this.toogle = !this.toogle;
      if (event.fromState)
        this.wordCounter = (this.wordCounter + 1) % this.wordCarousel.length;
  }

  
  @HostListener('window: keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowDown") {
      this.scrollToSpecificSection(this.currSecIdx + 1)
    } else if (event.key === "ArrowUp") {
      this.scrollToSpecificSection(this.currSecIdx - 1)
    }
  }
  onScroll(event: WheelEvent) {
    if (this.isScrolling) {
      return;
    }
    if (event.deltaY > 0) {
      this.scrollToSpecificSection(this.currSecIdx + 1)
    } else {
      this.scrollToSpecificSection(this.currSecIdx - 1)
    }

    setTimeout(() => {
      this.isScrolling = false
    }, 1000)
  }
  scrollToSpecificSection(idx: number) {
    debugger;
    if (idx < 1 || idx >= this.sections.length) return;
    this.currSecIdx = idx;
    const secElement = document.getElementById('section' + idx)
    if (secElement) {
      secElement.scrollIntoView({ behavior: "smooth" })
    }
  
  }
}

