<?php

namespace Acme\DemoBundle\Controller;

use Acme\DemoBundle\Services\Game;
use Acme\DemoBundle\Services\Coord;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class GameController extends Controller
{
    public function indexAction()
    {
        return $this->render('AcmeDemoBundle:Game:index.html.twig');
    }

    public function playAction()
    {
        return $this->render('AcmeDemoBundle:Game:play.html.twig');
    }
    public function listAction()
    {
        return $this->render('AcmeDemoBundle:Game:list.html.twig');
    }
    public function makeAction()
    {
        return $this->render('AcmeDemoBundle:Game:list.html.twig');
    }
}
