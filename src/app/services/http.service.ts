import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  minions = [
    {
      id: 398,
      name: "Wind-up Gaia",
      enhanced_description: "Supposedly discovered by those investigating the Empty, its appearance there is both inexplicable and implausible. Considering all the other unlikely events that occurred there, however, perhaps the sudden materialization of a hammer-wielding mammet is not so unusual after all.",
      patch: "5.4",
      image: "https://ffxivcollect.com/images/minions/large/398.png",
      owned: 	"59%",
      sources: [
        {
          type: "Raid",
          text: "Eden's Promise: Eternity",
          related_type: 'Instance'
        }
      ]
    }
  ]

}
