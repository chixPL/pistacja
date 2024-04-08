# Wstawianie rekordów do tabel
from click import command
import psycopg2
from config import config

def insert_address(address1, address2, city):
    command = """
            INSERT INTO address(address1, address2, city)
            VALUES(%s, %s, %s) RETURNING id_address;
    """
    
    conn = None
    id_address = None
    
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        cur.execute(command, (address1, address2, city))
        id_address = cur.fetchone()[0]
        
        cur.close()
        conn.commit()                       #zatwierdzanie wykonania komendy
    except (Exception, psycopg2.DatabaseError) as err:
        print(f"Błąd bazy: {err}")
    
    finally:
        if conn is not None:
            conn.close() 
        print(f"Wstawienie rekordu o id= {id_address} zakończono... ")

def insert_address_list(address_list):
    command = """
            INSERT INTO address(address1, address2, city)
            VALUES(%s, %s, %s);
    """
    conn = None
    id_address = None
    
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        print(address_list)
        
        for add in address_list:       
            cur.execute(command, (str(add[0]), str(add[1]), str(add[2])))
        
        cur.close()
        conn.commit()                       #zatwierdzanie wykonania komendy
    except (Exception, psycopg2.DatabaseError) as err:
        print(f"Błąd bazy: {err}")
    
    finally:
        if conn is not None:
            conn.close() 
        print(f"Wstawienie rekordów zakończono... ")


if __name__ == '__main__':
    insert_address("Długa", "23", "Warszawa") 
    
    insert_address_list([
        ("Średnia", "17", "Warszawa"),
        ("Krótka", "2A", "Gdańsk"),
        ("Długa", "13", "Kraków"),
        ]) 