var ctype = require('ctype')
  , fields = require('../lib/messages/fields')

describe('Check type', function() {
  it('should identify primitive types', function() {
    expect(fields.isPrimitiveType('bool')).toEqual(true)
    expect(fields.isPrimitiveType('int8')).toEqual(true)
    expect(fields.isPrimitiveType('uint8')).toEqual(true)
    expect(fields.isPrimitiveType('int16')).toEqual(true)
    expect(fields.isPrimitiveType('uint16')).toEqual(true)
    expect(fields.isPrimitiveType('int32')).toEqual(true)
    expect(fields.isPrimitiveType('uint32')).toEqual(true)
    expect(fields.isPrimitiveType('float32')).toEqual(true)
    expect(fields.isPrimitiveType('float64')).toEqual(true)
    expect(fields.isPrimitiveType('string')).toEqual(true)

    // Arrays are not primitives
    expect(fields.isPrimitiveType('bool[]')).toEqual(false)
    expect(fields.isPrimitiveType('float32[]')).toEqual(false)
    expect(fields.isPrimitiveType('float64[]')).toEqual(false)
    expect(fields.isPrimitiveType('float64[36]')).toEqual(false)
    expect(fields.isPrimitiveType('std_msgs/String[]')).toEqual(false)

    // Message Types are not primitives
    expect(fields.isPrimitiveType('std_msgs/String')).toEqual(false)
    expect(fields.isPrimitiveType('Header')).toEqual(false)
    expect(fields.isPrimitiveType('geometry_msgs/Twist')).toEqual(false)
    expect(fields.isPrimitiveType('Point32')).toEqual(false)
    expect(fields.isPrimitiveType('String')).toEqual(false)
  })

  it('should identify arrays', function() {
    expect(fields.isArray('bool[]')).toEqual(true)
    expect(fields.isArray('int8[]')).toEqual(true)
    expect(fields.isArray('float32[]')).toEqual(true)
    expect(fields.isArray('float64[36]')).toEqual(true)
    expect(fields.isArray('std_msgs/String[]')).toEqual(true)
    expect(fields.isArray('geometry_msgs/Twist[]')).toEqual(true)
    expect(fields.isArray('Point32[]')).toEqual(true)

    expect(fields.isArray('bool')).toEqual(false)
    expect(fields.isArray('float32')).toEqual(false)
    expect(fields.isArray('std_msgs/String')).toEqual(false)
    expect(fields.isArray('Header')).toEqual(false)
    expect(fields.isArray('Point32')).toEqual(false)
  })

  it('should identify message types', function() {
    expect(fields.isMessageType('std_msgs/String')).toEqual(true)
    expect(fields.isMessageType('geometry_msgs/String')).toEqual(true)
    expect(fields.isMessageType('String')).toEqual(true)
    expect(fields.isMessageType('Header')).toEqual(true)
    expect(fields.isMessageType('Point32')).toEqual(true)

    expect(fields.isMessageType('bool')).toEqual(false)
    expect(fields.isMessageType('float32')).toEqual(false)
    expect(fields.isMessageType('string')).toEqual(false)
    expect(fields.isMessageType('bool[]')).toEqual(false)
    expect(fields.isMessageType('float32[]')).toEqual(false)
    expect(fields.isMessageType('float64[36]')).toEqual(false)
    expect(fields.isMessageType('std_msgs/String[]')).toEqual(false)
    expect(fields.isMessageType('Point32[]')).toEqual(false)
  })
})

describe('Parse fields', function() {
  it('should work with bools', function() {
    var boolField = fields.parseField('bool', '1')
    expect(boolField).toEqual(true)
    boolField = fields.parseField('bool', '0')
    expect(boolField).toEqual(false)
    boolField = fields.parseField('bool', 'true')
    expect(boolField).toEqual(false)
    boolField = fields.parseField('bool', 'false')
    expect(boolField).toEqual(false)
  })

  it('should work with int8', function() {
    var int8Field = fields.parseField('int8', '7')
    expect(int8Field).toEqual(7)
    int8Field = fields.parseField('int8', '0')
    expect(int8Field).toEqual(0)
    int8Field = fields.parseField('int8', '-8')
    expect(int8Field).toEqual(-8)
    // Even numbers larger than an 8-bit int should still work
    int8Field = fields.parseField('int8', '3000')
    expect(int8Field).toEqual(3000)
    // While a string is expected, numeric values should work
    int8Field = fields.parseField('int8', 3000)
    expect(int8Field).toEqual(3000)
  })

  it('should work with uint8', function() {
    var uint8Field = fields.parseField('uint8', '7')
    expect(uint8Field).toEqual(7)
    uint8Field = fields.parseField('uint8', '0')
    expect(uint8Field).toEqual(0)
    uint8Field = fields.parseField('uint8', '-8')
    expect(uint8Field).toEqual(8)
    uint8Field = fields.parseField('uint8', '3000')
    expect(uint8Field).toEqual(3000)
    uint8Field = fields.parseField('uint8', 3000)
    expect(uint8Field).toEqual(3000)
  })

  it('should work with int16', function() {
    var int16Field = fields.parseField('int16', '17')
    expect(int16Field).toEqual(17)
    int16Field = fields.parseField('int16', '0')
    expect(int16Field).toEqual(0)
    int16Field = fields.parseField('int16', '-888')
    expect(int16Field).toEqual(-888)
    // Even numbers larger than an 16-bit int should still work
    int16Field = fields.parseField('int16', '65537')
    expect(int16Field).toEqual(65537)
    int16Field = fields.parseField('int16', 3030)
    expect(int16Field).toEqual(3030)
  })

  it('should work with uint16', function() {
    var uint16Field = fields.parseField('uint16', '117')
    expect(uint16Field).toEqual(117)
    uint16Field = fields.parseField('uint16', '0')
    expect(uint16Field).toEqual(0)
    uint16Field = fields.parseField('uint16', '-9888')
    expect(uint16Field).toEqual(9888)
    uint16Field = fields.parseField('uint16', '65537')
    expect(uint16Field).toEqual(65537)
    uint16Field = fields.parseField('uint16', 3030)
    expect(uint16Field).toEqual(3030)
  })

  it('should work with int32', function() {
    var int32Field = fields.parseField('int32', '817')
    expect(int32Field).toEqual(817)
    int32Field = fields.parseField('int32', '0')
    expect(int32Field).toEqual(0)
    int32Field = fields.parseField('int32', '-88899')
    expect(int32Field).toEqual(-88899)
    // Even numbers larger than an 32-bit int should still work
    int32Field = fields.parseField('int32', '5000000000')
    expect(int32Field).toEqual(5000000000)
    int32Field = fields.parseField('int32', 13030)
    expect(int32Field).toEqual(13030)
  })

  it('should work with uint32', function() {
    var uint32Field = fields.parseField('uint32', '1817')
    expect(uint32Field).toEqual(1817)
    uint32Field = fields.parseField('uint32', '0')
    expect(uint32Field).toEqual(0)
    uint32Field = fields.parseField('uint32', '-988899')
    expect(uint32Field).toEqual(988899)
    uint32Field = fields.parseField('uint32', '5000000000')
    expect(uint32Field).toEqual(5000000000)
    uint32Field = fields.parseField('uint32', 13230)
    expect(uint32Field).toEqual(13230)
  })

  it('should work with int64', function() {

  })

  it('should work with uint64', function() {

  })

  it('should work with float32', function() {
    var float32Field = fields.parseField('float32', '8172')
    expect(float32Field).toEqual(8172)
    var float32Field = fields.parseField('float32', '8172.356')
    expect(float32Field).toEqual(8172.356)
    float32Field = fields.parseField('float32', '0')
    expect(float32Field).toEqual(0)
    float32Field = fields.parseField('float32', '-88899.2')
    expect(float32Field).toEqual(-88899.2)
    float32Field = fields.parseField('float32', 13030.33)
    expect(float32Field).toEqual(13030.33)
  })

  it('should work with float64', function() {
    var float64Field = fields.parseField('float64', '1217')
    expect(float64Field).toEqual(1217)
    float64Field = fields.parseField('float64', '0')
    expect(float64Field).toEqual(0)
    float64Field = fields.parseField('float64', '-988899.3')
    expect(float64Field).toEqual(-988899.3)
    float64Field = fields.parseField('float64', '520000')
    expect(float64Field).toEqual(520000)
    float64Field = fields.parseField('float64', 13.230)
    expect(float64Field).toEqual(13.230)
  })

  it('should work with string', function() {
    var stringField = fields.parseField('string', '1217')
    expect(stringField).toEqual('1217')
    stringField = fields.parseField('string', 'I am a dinosaur')
    expect(stringField).toEqual('I am a dinosaur')
    stringField = fields.parseField('string', '')
    expect(stringField).toEqual('')
  })
})

describe('Get field size', function() {
  it('should return correctly for bool', function() {
    var fieldSize = fields.getFieldSize('bool')
    expect(fieldSize).toEqual(1)
  })

  it('should return correctly for int8', function() {
    var fieldSize = fields.getFieldSize('int8')
    expect(fieldSize).toEqual(1)
  })

  it('should return correctly for uint8', function() {
    var fieldSize = fields.getFieldSize('uint8')
    expect(fieldSize).toEqual(1)
  })

  it('should return correctly for int16', function() {
    var fieldSize = fields.getFieldSize('int16')
    expect(fieldSize).toEqual(2)
  })

  it('should return correctly for uint16', function() {
    var fieldSize = fields.getFieldSize('uint16')
    expect(fieldSize).toEqual(2)
  })

  it('should return correctly for int32', function() {
    var fieldSize = fields.getFieldSize('int32')
    expect(fieldSize).toEqual(4)
  })

  it('should return correctly for uint32', function() {
    var fieldSize = fields.getFieldSize('uint32')
    expect(fieldSize).toEqual(4)
  })

  it('should return correctly for int64', function() {
    var fieldSize = fields.getFieldSize('int64')
    expect(fieldSize).toEqual(8)
  })

  it('should return correctly for uint64', function() {
    var fieldSize = fields.getFieldSize('uint64')
    expect(fieldSize).toEqual(8)
  })

  it('should return correctly for float32', function() {
    var fieldSize = fields.getFieldSize('float32')
    expect(fieldSize).toEqual(4)
  })

  it('should return correctly for float64', function() {
    var fieldSize = fields.getFieldSize('float64')
    expect(fieldSize).toEqual(8)
  })

  it('should return correctly for string', function() {

  })

})

describe('Read field from buffer', function() {
  it('should return correctly for primitive types', function() {
    var buffer = null
      , bufferOffset = 0
      , fieldValue = null

    buffer = new Buffer(1)
    ctype.wuint8(7, 'little', buffer, bufferOffset)
    fieldValue = fields.readFieldFromBuffer('bool', buffer, bufferOffset)
    expect(fieldValue).toEqual(7)

    buffer = new Buffer(1)
    bufferOffset = 0
    ctype.wsint8(-7, 'little', buffer, bufferOffset)
    fieldValue = fields.readFieldFromBuffer('int8', buffer, bufferOffset)
    expect(fieldValue).toEqual(-7)

    buffer = new Buffer(4)
    bufferOffset = 1
    ctype.wsint16(-300, 'little', buffer, bufferOffset)
    fieldValue = fields.readFieldFromBuffer('int16', buffer, bufferOffset)
    expect(fieldValue).toEqual(-300)

    buffer = new Buffer(6)
    bufferOffset = 2
    ctype.wuint32(3100, 'little', buffer, bufferOffset)
    fieldValue = fields.readFieldFromBuffer('uint32', buffer, bufferOffset)
    expect(fieldValue).toEqual(3100)

    buffer = new Buffer(4)
    bufferOffset = 0
    ctype.wfloat(1.2, 'little', buffer, bufferOffset)
    fieldValue = fields.readFieldFromBuffer('float32', buffer, bufferOffset)
    expect(fieldValue).toEqual(1.2)

    buffer = new Buffer(9)
    bufferOffset = 1
    ctype.wdouble(-231.22, 'little', buffer, bufferOffset)
    fieldValue = fields.readFieldFromBuffer('float64', buffer, bufferOffset)
    expect(fieldValue).toEqual(-231.22)

    // STOPPED
    // Fix Float32.
    // Test with String and others.
    // Test exceptions for 64-bit int.
  })
})

