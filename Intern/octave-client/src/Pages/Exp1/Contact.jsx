import React from "react";

const Contact = () => {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-lg font-semibold underline pb-2">
          Lab Proposer / Subject Matter Experts
        </h2>
        <table className="table-auto border border-collapse border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">SNo.</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Institute</th>
              <th className="border border-gray-300 px-4 py-2">Position</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-center">1</td>
              <td className="border border-gray-300 px-4 py-2">
                person
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href="mailto:mail"
                  className="text-blue-600 underline font-semibold"
                >
                  mail
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">IIT Roorkee</td>
              <td className="border border-gray-300 px-4 py-2">
                Professor
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-lg font-semibold underline pb-2">
          Persons Associated in the Lab Development
        </h2>
        <table className="table-auto border border-collapse border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">SNo.</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Institute</th>
              <th className="border border-gray-300 px-4 py-2">Position</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-center">1</td>
              <td className="border border-gray-300 px-4 py-2">person1</td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href="mailto:person1"
                  className="text-blue-600 underline font-semibold"
                >
                  person1
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">IIT Roorkee</td>
              <td className="border border-gray-300 px-4 py-2">
                Contributor
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-center">2</td>
              <td className="border border-gray-300 px-4 py-2">person2</td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href="mailto:person2"
                  className="text-blue-600 underline font-semibold"
                >
                  person2
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">IIT Roorkee</td>
              <td className="border border-gray-300 px-4 py-2">
                Contributor
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-center">3</td>
              <td className="border border-gray-300 px-4 py-2">
                person3
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href="mailto:person3"
                  className="text-blue-600 underline font-semibold"
                >
                  person3
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">IIT Roorkee</td>
              <td className="border border-gray-300 px-4 py-2">
                Contributor
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Contact;

