import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Constants } from '../../_config/constants';
import { CampaignVisit } from '../../_models/StoreVisitModel';
import { OpsAdminService } from '../../_services/opsAdmin.service';
import { IRCodeModel } from '../../_models/irCode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpsClientService } from '../../_services/opsClient.service';

//we need to pull from webstorage
@Component({
    selector: 'app-opsclient-answer',
    templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})

export class OpsAnswersComponent implements OnInit {
    public progress: number;
    public message: string;
  selectedIRCode: IRCodeModel;
  IRCodes: any[];
  firstLoad: boolean = true;
    @Output() public onUploadFinished = new EventEmitter();
    @Output() actionEvent = new EventEmitter<CampaignVisit>();
  @Input() question: any
  @Input() selectedAnswers: any[];
 
  @Input() action: any;
  needsComment: boolean = false;
  answerComment: string = '';
  actionForm: FormGroup;
  selectedAnswer: any;
  notSelected: boolean = true;
  comment: string = '';
    
  public currentSpeedSlow: boolean = false;
  constructor(private http: HttpClient, private opsAdminService: OpsAdminService, private opsClientService: OpsClientService, private formBuilder: FormBuilder,) {
   
   

  }

  ngOnInit() {
    
    this.checkIfSelected();
    this.buildForm();

  }
  setAnswer(answer) {
    if (answer.value) {
      this.needsComment = answer.value.answers.needsComment;
    }
    this.action.hasAnswersChanged = true;
    //ok, we also need to create the object here and append it to the action
    let currentItem = this.action.installationScheduleQuestionsAndAnswers.find(i => i.questionId === this.question.questionId);
    if (currentItem && answer.value) {
      currentItem.answerId = answer.value.answers.answerId;
      currentItem.comment = this.answerComment;

    }
    else if (answer.value) {
      var answerValue = {
        //installationScheduleQuestionsAndAnswersId: 0,
        installationActionId: this.action.installationScheduleCurrentID,
        answerId: answer.value.answers.answerId,
        questionId: this.question.questionId,
        comment: this.answerComment,
      };

      //find it if it exists and change it, otherwise add it
      this.action.installationScheduleQuestionsAndAnswers.push(answerValue);
    }
    else if (currentItem) {
     
      currentItem.comment = this.answerComment;
    }
    this.checkIfSelected();
    this.actionEvent.emit(this.action);

  }
  clearAnswerComment() {
    //alert('clear the comment');
  }
  buildForm() {
    this.actionForm = this.formBuilder.group({
      answerCommentControl: ['', Validators.required],


    });
  }

  checkIfSelected() {
    var questionId = this.question.questionId;
    var selectedAnswer;
    var comment;
    this.selectedAnswers.forEach(function (value) {
      if (questionId == value.questionId) {
        selectedAnswer = value;
        if (value.comment != null) {
          comment = value.comment;
        }
      }
    });
    if (selectedAnswer) {
      this.selectedAnswer = selectedAnswer;
      this.setSelectedAnswer();
    }
    this.comment = comment;
  }

  setSelectedAnswer() {
    if (this.selectedAnswer) {
      var selectedAnswer;
      var currentAnswer = this.selectedAnswer;
      
      this.question.questionsAndAnswers.forEach(function (value) {
        //console.log(value);
        if (currentAnswer.answerId == value.answerId) {
          //alert(value.answerId);
          selectedAnswer = value.answers;
          
        }
      });
      //lets set it correctly now.
      this.notSelected = false;
      //alert(this.notSelected);
      this.selectedAnswer = selectedAnswer;
      
    }
  }
  resetAnswer() {
    this.notSelected = true;
    //we need to reset it here
  }
  setComment() {
    //it has now set the comment.
    //this.setAnswer();
   // this.selectedAnswer.answers.needsComment = true;
    this.setAnswer(this.selectedAnswer);
  }
  commentChanges(event) {
    //console.log(this.question);
    let currentItem = this.action.installationScheduleQuestionsAndAnswers.find(i => i.questionId === this.question.questionId);
    if (currentItem) {
     
      currentItem.comment = event;

    }
  }
  sendCommentToAction() {
    let currentItem = this.action.installationScheduleQuestionsAndAnswers.find(i => i.questionId === this.question.questionId);
    if (currentItem) {

      if (currentItem.comment.length == 0 || currentItem.comment == 'Please specify a comment') {
        //alert('Please specify a comment');
        this.answerComment = 'Please specify a comment';
        document.getElementById("answerCommentControl").focus();

      }

    }
    this.setAnswer(this.selectedAnswer);
  }
}
