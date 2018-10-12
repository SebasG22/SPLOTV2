import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap, map, tap } from 'rxjs/operators';
import { IProject } from '../../projects/models';
import { forEach, get, has, assign } from 'lodash';
import { combineLatest, of } from 'rxjs';

export abstract class FirebaseServiceAbstract {

    constructor(
        private afsStore: AngularFirestore
    ) { }


    /**
     * Add the property docId to each item
     * @param data
     */
    public addDocIdOnArray(data: any[]) {
        data.map((item: any) => {
            this.addDocIdOnItem(item);
        });
        return data;
    }

    /**
     * Add the property docId to one item
     * @param data
     */
    public addDocIdOnItem(item) {
        Object.assign(item, { docId: get(item, 'id', '') });
    }

    /**
     * Add the property
     * @param item
     * @param subCollection
     */
    public addSubCollectionIdOnItem(item: any, subCollection: string) {
        item.subCollectionId = subCollection;
        return item;
    }

    /**
     * Get the value of the collection
     * @param collectionId
     */
    protected getCollectionById(collectionId: string) {
        return this.afsStore.collection(collectionId).valueChanges();
    }

    /**
     * Get a single document by id of the collection
     * @param collectionId
     * @param docId
     */
    protected getDocumentByCollectionId(collectionId: string, docId: string, collectionIdName: string = collectionId) {
        return this.afsStore.collection(collectionId).doc(docId).valueChanges()
            .pipe(
                map((data) => {
                    const obj = { collection: collectionId, docId: docId };
                    obj[`${collectionIdName}`] = data;
                    return obj;
                })
            );
    }


    protected getCollectionWithSubCollection(collectionId: string, docId: string, subCollectionId: string) {
        return this.afsStore.collection(collectionId).doc(docId).collection(subCollectionId).valueChanges().pipe(
            map((response) => {
                const obj = { subCollectionId: subCollectionId, docId: docId };
                obj[`${subCollectionId}`] = response;
                return obj;
            })
        );
    }

    protected getCollectionWithSubsCollections(collectionId: string, subCollectionsIds: string[]) {
        return this.getCollectionById(collectionId)
            .pipe(
                map(data => {
                    return this.addDocIdOnArray(data);
                }),
                switchMap((response) => {
                    const obs = [];
                    if (response.length !== 0) {
                        forEach(response, item => {
                            forEach(subCollectionsIds, subCollectionId => {
                                obs.push(this.getCollectionWithSubCollection(collectionId, item.id, subCollectionId));
                            });
                        });
                    }
                    return (obs.length === 0) ? of([]) : combineLatest(obs)
                        .pipe(
                            map((data: any) => {
                                forEach(subCollectionsIds, subCollectionIdItem => {
                                    forEach(response, item => {
                                        item[`${subCollectionIdItem}`] = get(data.filter((subCollectionDataItem) => {
                                            return subCollectionDataItem.docId === item.docId;
                                        }), `0.${subCollectionIdItem}`, []);
                                    });
                                });
                                return response;
                            })
                        );
                })
            );
    }
}
