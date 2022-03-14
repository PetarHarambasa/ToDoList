import MathService from '../service/math.service.js'
import Math from '../models/math.model.js'

export function sum(req, res) {
    const a = req.body.a;
    const b = req.body.b;
    const result = MathService.sumData(a, b);
    res.send({result})
}

export function sub(req, res) {
    const a = req.body.a;
    const b = req.body.b;
    const result = MathService.subData(a, b);
    res.send({result})
}

export function mul(req, res) {
    const a = req.body.a;
    const b = req.body.b;
    const result = MathService.mulData(a, b);
    res.send({result})
}

export function div(req, res) {
    const a = req.body.a;
    const b = req.body.b;
    const result = MathService.divData(a, b);
    res.send({result})
}