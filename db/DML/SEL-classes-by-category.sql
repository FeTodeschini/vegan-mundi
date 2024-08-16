SELECT DISTINCT CLS.CATEGORY_ID, CLS.TITLE, CLS.DESCRIPTION, CLS.PHOTO ,  
                         ( SELECT GROUP_CONCAT(TITLE SEPARATOR '|') 
                            FROM 
                              RECIPE R 
                                INNER JOIN CLASS_RECIPE C ON 
                                  R.RECIPE_ID = C.RECIPE_ID 
                                  AND C.CLASS_ID = CLS.CLASS_ID
                                  AND (SELECT COUNT(TITLE) FROM RECIPE R INNER JOIN CLASS_RECIPE C ON R.RECIPE_ID = C.RECIPE_ID AND C.CLASS_ID = CLS.CLASS_ID ) > 1
                              ) CLASSES_LIST   
                       FROM  
                         CLASS_CATEGORY CAT   
                         INNER JOIN CLASS CLS ON  
                           CAT.CATEGORY_ID = CLS.CATEGORY_ID   
                           AND UPPER(CAT.CATEGORY_ID) = ${req.params.category}   
                         INNER JOIN CLASS_RECIPE CLR ON  
                           CLS.CLASS_ID = CLR.CLASS_ID  
                         INNER JOIN RECIPE RCP ON  
                           CLR.RECIPE_ID = RCP.RECIPE_ID 