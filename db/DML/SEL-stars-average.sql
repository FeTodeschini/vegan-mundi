(SELECT TRUNCATE(AVG(STARS),1) FROM REVIEW REV WHERE REV.CLASS_ID = CLS.CLASS_ID GROUP BY CLASS_ID ) AS AVERAGE_STARS, 