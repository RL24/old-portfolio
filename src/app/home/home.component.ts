import {Component} from '@angular/core';

interface IProjectImage {
  primary: string;
  secondary?: string;
}

interface IProject {
  image: IProjectImage;
  name: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public projects: IProject[] = [{
    image: {
      primary: '/assets/images/projects/mymahi/primary.png',
      secondary: '/assets/images/projects/mymahi/secondary.png'
    },
    name: 'MyMahi',
    description: 'Commercial Web App',
    url: '//mymahi.co.nz'
  }, {
    image: {
      primary: '/assets/images/projects/portfolio/primary.png'
    },
    name: 'Portfolio',
    description: 'My Portfolio',
    url: '/'
  }, {
    image: {
      primary: '/assets/images/projects/the-graphic-shop/primary.png',
      secondary: '/assets/images/projects/the-graphic-shop/secondary.png'
    },
    name: 'The Graphic Shop',
    description: 'Company Landing Page',
    url: '//thegraphicshop.co.nz'
  }, {
    image: {
      primary: '/assets/images/projects/tuckbox/primary.png'
    },
    name: 'TuckBox',
    description: 'Demo Android App',
    url: '//github.com/RL24/D303'
  }, {
    image: {
      primary: '/assets/images/projects/sudoku-solver/primary.png',
      secondary: '/assets/images/projects/sudoku-solver/secondary.png'
    },
    name: 'Sudoku Solver',
    description: 'Demo VC++ App',
    url: '//github.com/RL24/I309'
  }, {
    image: {
      primary: '/assets/images/projects/newsfeed/primary.png',
      secondary: '/assets/images/projects/newsfeed/secondary.png',
    },
    name: 'Newsfeed',
    description: 'Demo NodeJS App',
    url: '//github.com/RL24/I311'
  }];
}
