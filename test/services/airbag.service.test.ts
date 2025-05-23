import { AirbagService, CrashSensor, AirbagIgniter, AirbagResult } from '../../services/airbag.service';
import { mock, MockProxy } from 'jest-mock-extended';
import { when } from 'jest-when';

describe('AirbagService', () => {
    let sensorMock: MockProxy<CrashSensor>;
    let igniterMock: MockProxy<AirbagIgniter>;
    let service: AirbagService;

    beforeEach(() =>{
        sensorMock = mock<CrashSensor>();
        igniterMock = mock<AirbagIgniter>();
        service = new AirbagService(sensorMock,igniterMock);
    })
    it('deploys the airbag when a crash is detected', () => {
        //Arrange
        when(sensorMock.isCrashDetected).calledWith().mockReturnValue(true);

        //Act
        const result = service.deployAirbag();

        //Assert
        expect(result).toEqual({ triggered: true, force: 100, timing: 50 });
        expect(sensorMock.isCrashDetected).toHaveBeenCalled();
        expect(igniterMock.trigger).toHaveBeenCalledWith(100,50);
    });

    it('does not deploy the airbag when no crash is detected', () => {
       //Arrange
       when(sensorMock.isCrashDetected).calledWith().mockReturnValue(false);

       //Act
       const result:AirbagResult = service.deployAirbag();

       //Assert
       expect(sensorMock.isCrashDetected).toHaveBeenCalled();
       expect(igniterMock.trigger).not.toHaveBeenCalledWith();
       expect(result).toEqual({ triggered: false});
    });

})