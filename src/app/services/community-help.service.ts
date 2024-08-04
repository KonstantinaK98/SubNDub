import { Injectable } from "@angular/core";
import { CommunityHelpRequest } from "../models/firestore-schema/help-request.model";
import { first, map, Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable()
  
export class CommunityHelpService  {
    communityRequestDetails: CommunityHelpRequest;

    constructor(private firestore: AngularFirestore){}
    
    setCommunityRequestDetails(details: CommunityHelpRequest): void {
        this.communityRequestDetails = details;
    }

    getUserNameFromEmail(email: string):Observable<string>{
        return this.firestore.collection('users', ref => ref.where('email', '==', email))
        .valueChanges()
        .pipe(
            map(users => {
            if (users && users.length > 0) {
                return users[0]['displayName']; 
            } else {
                return null;
            }
            }), first()
        );
    }
    
}