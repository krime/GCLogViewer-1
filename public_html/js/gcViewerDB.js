/* 
 * Copyright 2014 mark.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

app.factory('GCViewerDB', ['getDataStoreObject', function (getDataStoreObject) {

        var GCViewerDB = function () {
            this.db = null;
        };

        GCViewerDB.prototype.initDb = function () {

            var schema = [{
                    gcEntry: {
                        params: {
                            autoIncrement: true
                        }
                    }
                },
                {
                    gcEntry: {
                        indices: [
                            ['timestamp', 'timeStamp', {unique: false}],
                            ['dateStamp', 'dateStamp', {unique: false}]
                        ]
                    }
                }];

            this.db = getDataStoreObject("GCViewer", 2, schema);
        };

        GCViewerDB.prototype.updateDataStore = function (objs,onsuccess,onerror,onabort,oncommit) {
            var objStore = this.db.getObjectStoreFromTransaction("gcEntry", "readwrite");
            objStore.onabort = function(e){
                console.log("Transaction aborted due to error");
                if (onabort){
                    onabort(e);
                }
            };
            objStore.onerror =function(e){
                console.log("transaction error");
            }
            objStore.oncomplete=function(e){
                if (oncommit){
                    oncommit(e);
                }
                console.log("Transaction committed");
            };
            this.db.insertObjectArray(objStore, objs,onsuccess,onerror);
        };

        GCViewerDB.prototype.dropDataStore = function () {
            this.db.dropDataStore();
        };

        GCViewerDB.prototype.createDataStore = function () {
            this.db.createDataStore();
        };

        GCViewerDB.prototype.findMin = function (attribute, resultObj) {
            this.db.findMax('gcEntry', attribute, resultObj);
        };

        GCViewerDB.prototype.findMax = function (attribute, resultObj) {
            this.db.findMax('gcEntry', attribute, resultObj);
        };

        GCViewerDB.prototype.getDataPoints = function (callback) {
            this.db.getObjectArray('gcEntry', callback);
        };
        return GCViewerDB;
    }]);