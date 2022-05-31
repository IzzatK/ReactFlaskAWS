from exts import db


"""
class Recipe:
    id: int primary key
    title: str
    description: str (text)


"""

class Recipe(db.Model):
    id = db.Column(db.Integer(), primary_key=True) #()empty params not included in blogapp Models
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    user_id=db.Column(db.BigInteger(), db.ForeignKey('user.id'), nullable=False)
    username=db.Column(db.String(), nullable=False)
    # recipe_file=db.Column(db.String(), nullable=True, default='default.pdf')
    # comments=db.Column(db.String(), db.ForeignKey('user.id'), nullable=False)
    

    def __repr__(self):
        return f"<Recipe {self.title}>"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, title, description):
        self.title=title,
        self.description=description,

        db.session.commit()
        

#user model
"""
class User:
    id:integer,
    username:string
    email:string
    password: string
"""

class User(db.Model):
    id=db.Column(db.Integer(), primary_key=True)
    username=db.Column(db.String(), nullable=False, unique=True)
    email=db.Column(db.String(), nullable=False, unique=True)
    recipes=db.relationship('Recipe', backref='author', lazy=True)
    # comments=db.relationship('Recipe', backref='commentauthor', lazy=True)

    def __repr__(self):
        return f"<User {self.username}>"

    def save(self):
        db.session.add(self)
        db.session.commit()
