const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Part = ({part, exercises}) => {
    return (
        <div>
        <p>{part} {exercises}</p>
      </div>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(p => 
                <Part key={p.id} part={p.name} exercises={p.exercises} />
            )}
        </div>
    )
}

const Total = ({parts}) => {
    return (
        <div>
            <p style={{fontWeight: "bold"}}>total of {parts.map(p => p.exercises).reduce((a, b) => a + b)} exercises</p>
        </div>
    )
}

const Course = (props) => {
    const {course} = props
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
}

export default Course