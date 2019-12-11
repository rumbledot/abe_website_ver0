class Message {
    constructor(id, title, description, content, status){
        this.id = id;
        this.title = title;
        this.description = description;
        this.content = content;
        this.status = status;
        this.msgClubs = [];
        this.q1 = "";
        this.q2 = "";
        this.q3 = "";
    }

    addClubs(clubs){
        this.msgClubs = clubs;
    }

    addQuestions(q1, q2, q3) {
        this.q1 = q1;
        this.q2 = q2;
        this.q3 = q3;
    }

    getAll() {
        console.log("message");
        console.log(this.id);
        console.log(this.title);
        console.log(this.description);
        console.log(this.content);
        console.log(this.status);
        console.log(this.msgClubs.length);
    }
}