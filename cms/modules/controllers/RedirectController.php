<?php

namespace modules\controllers;

use Craft;
use yii\web\Controller;

class RedirectController extends Controller
{
    public function actionIndex()
    {
        // check if request is GET
        if (Craft::$app->request->isGet) {
            // redirect to admin page
            return $this->redirect('/admin');
        }

        // redirect to home page
        return $this->redirect('/');
    }
}