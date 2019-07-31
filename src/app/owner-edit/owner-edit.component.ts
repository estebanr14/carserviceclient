import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerService } from '../shared/owner/owner.service';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit, OnDestroy {
  owner: any = {};
  sub: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private ownerService: OwnerService, ) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const dni = params['dni'];
      if (dni) {
        this.ownerService.getWithDNI(dni).subscribe((ownerWithDNI: any) => {
          if (ownerWithDNI) {
            this.ownerService.get(ownerWithDNI[0].id).subscribe((owner: any) => {
              this.owner = owner;
              this.owner.href = owner._links.self.href;
            })

          }
        })
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/owners']);
  }

  save(form: NgForm) {
    this.ownerService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.ownerService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

}
